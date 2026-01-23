const express = require("express");
const boardRoute = require("./routes/board.route");

const app = express(); //인스턴스
app.use(express.json()); //body데이터(json포멧)해석.
app.use("/boards", boardRoute); //게시판 라우팅

//라우팅
app.get("/", (req, res) => {
  res.send("/ 경로호출");
});

app.listen(3000, () => {
  console.log("서버실행 http://localhost:3000");
});
