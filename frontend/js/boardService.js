//boardService.js (모듈기능 제공)
const API_URL = "http://localhost:3000/boards";

const svc = {
  getBoards(page, callback) {
    fetch(API_URL + "/pg/" + page)
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
  getTotalCount(callback) {
    fetch(API_URL + "/totalCount")
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
  formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();
    // 날짜 포맷 출력 => yyyy-mm-dd HH:MM:SS 형태출력 메소드.
    return `${yyyy}-${("0" + mm).slice(-2)}-${("0" + dd).slice(-2)} ${("0" + hh).slice(-2)}:${("0" + mi).slice(-2)}:${("0" + ss).slice(-2)}`;
  },
  addPost(post = {}, callback) {
    fetch(API_URL, {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((resp) => resp.json())
      .then(callback)
      .catch((err) => console.error(err));
  },
};

export { svc };
