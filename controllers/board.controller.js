const service = require("../services/board.services");
//컨트롤러의 역할 -> /boards => view에 정보를 전달

//service.findAll();

const ctrl = {
  list: async (req, res) => {
    const rows = await service.findAll();
    res.send(rows);
  },
  create: async (req, res) => {
    //{ title: 'postman을을 활용', content: 'post 요청처리하기..', writer: 'user99' }
    const { title, content, writer } = req.body; //fetch('',{method,headers,(body =>(이걸 불러오겠다))})
    const result = await service.create({ title, content, writer });
    res.send(result);
  },
  // detail: async (req, res) => {
  //   const id = req.params.id;
  //   const result = await service.findById(id);
  //   res.send(result);
  // },
  detail: async (req, res) => {
    const { id } = req.params;
    const result = await service.findById({ id });
    res.send(result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await service.update({ title, content, id });
    //false (falsy : 0, null,"",undefined)
    if (result) {
      res.json('{"retCode":"OK"}');
    } else {
      res.json('{"retCode":"NG"}');
    }
  },
  remove: async (req, res) => {
    const id = req.params.id;
    const result = await service.remove(id);
    if (result) {
      res.json('{"delete":"OK"}');
    } else {
      res.json('{"delete":"NG"}');
    }
  },
};

module.exports = ctrl;
