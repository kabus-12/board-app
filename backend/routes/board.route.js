const router = require("express").Router();
const ctrl = require("../controllers/board.controller");

//라우팅
//http://localhost:3000/boards/
router.get("/", ctrl.list); //목록
router.post("/", ctrl.create); //등록
router.get("/:id", ctrl.detail); //단건조회 (하나만 조회하겠다)
router.put("/:id", ctrl.update); //수정
router.delete("/:id", ctrl.remove); //삭제 (delete,컨트롤:remove,서비스remove)

module.exports = router;
