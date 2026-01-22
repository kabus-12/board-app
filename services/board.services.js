const pool = require("../db");

const service = {
  //여러개 검색
  findAll: async function () {
    let [rows, result] = await pool.query("select * from board"); //배열 구조분해
    console.log(rows);
    return rows;
  },
  // findById: async function (data) {
  //   let [rows, result] = await pool.query(
  //     `select * from board where id = ${data}`,
  //   );
  //   console.log(rows);
  //   return rows;
  // },
  //단건검색
  findById: async function (data) {
    const { id } = data;
    let [rows, result] = await pool.query("select * from board where id = ?", [
      id,
    ]);
    console.log(rows);
    return rows;
  },
  //생성
  create: async function (data = {}) {
    const { title, content, writer } = data; //객체 구조분해
    let result = await pool.query(
      "insert into board(title,content,writer) values(?,?,?)",
      [title, content, writer],
    );
    console.log(result);
    return result[0].insertId;
  },
  //수정
  update: async function (data = {}) {
    const { title, content, id } = data;
    console.log(id);
    let result = await pool.query(
      "update board set title = ?,content =? where id = ?",
      [title, content, id],
    );
    console.log(result);
    return result[0].affectedRows;
  },
  remove: async function (id) {
    let rows = await pool.query("delete from board where id = ?", [id]);
    console.log(rows);
    return rows;
  },
};

module.exports = service;

// create({ title: "db입력연습", content: "insert구문연습", writer: "user99" });
