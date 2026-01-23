import { svc } from "./boardService.js";

//CORS => 동일한 출처 허용
//http(프로토콜),호스트(localhost),Port(3000,5500) 이 중 하나라도 다르면 다르다고 생각한다

//게시글 출력
function loadBoards(page = 1) {
  //svc객체의 getBoards메소드 활용
  svc.getBoards(page, (data) => {
    const tdy = document.querySelector("#boardBody");
    tdy.innerText = "";
    data.forEach((elem) => {
      const str = `<tr>
                    <td>${elem.id}</td>
                    <td>${elem.title}</td>
                    <td>${elem.content}</td>
                    <td>${elem.writer}</td>
                    <td>${svc.formatDate(new Date(elem.created_at))}</td>
                    </tr>`;
      tdy.insertAdjacentHTML("beforeend", str);
    });
  });
}
loadBoards(1);

//페이징 목록 출력
let page = 1; //page전역변수
function loadPagingList() {
  const pagination = document.querySelector("div.board-pagination");
  pagination.innerText = "";
  const cb = (data) => {
    //변수선언 및 계산
    const totalCnt = data.cnt;
    let endPage = Math.ceil(page / 10) * 10; //현재페이지를 기준으로 계산한 페이지
    let startPage = endPage - 9;
    let realEnd = Math.ceil(totalCnt / 10); //건수를 기준으로 실제 마지막
    let prev = startPage == 1 ? false : true; //startPage(1,11,21,31....)
    let next = endPage < realEnd ? true : false; //endPage(10) ? realEnd(39) =>390
    endPage = endPage > realEnd ? realEnd : endPage; //실제 마지막페이지와 비교

    //이전페이지.
    //<button disabled>◀</button>
    let btnTag = document.createElement("button");
    btnTag.innerText = "◀";
    btnTag.setAttribute("data-page", startPage - 1);
    if (prev) {
    } else {
      btnTag.disabled = true;
    }
    btnTag.addEventListener("click", (e) => {
      loadBoards(endPage - 1);
    });
    pagination.appendChild(btnTag);

    //페이지
    //<button class="active">1</button>
    for (let pg = startPage; pg <= endPage; pg++) {
      let btnTag = document.createElement("button");
      btnTag.innerText = pg; //<button>1</button>
      btnTag.setAttribute("data-page", pg);
      //active페이지 설정
      if (pg == page) {
        btnTag.classList = "active"; //<button class="active">1</button>
      }
      pagination.appendChild(btnTag); //부모.appendChild(자식)
    }

    //이후페이지.
    let btnTag2 = document.createElement("button");
    btnTag2.innerText = "▶";
    btnTag2.setAttribute("data-page", endPage + 1);
    if (next) {
    } else {
      btnTag2.disabled = true;
    }
    btnTag2.addEventListener("click", (e) => {
      loadBoards(endPage + 1);
    });
    pagination.appendChild(btnTag2);
    //button에 클릭이벤트
    document.querySelectorAll("div.board-pagination>button").forEach((elem) => {
      elem.addEventListener("click", function (e) {
        page = this.dataset.page;
        loadBoards(page);
        loadPagingList(page);
      });
    });
  };
  //svc 객체의 메소드 호출
  svc.getTotalCount(cb);
}
loadPagingList();

//등록이벤트
document.querySelector("#add").addEventListener("click", (e) => {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const writer = document.querySelector("#writer").value;
  const create = { title, content, writer };
  svc.addPost(create);
});

//삭제
