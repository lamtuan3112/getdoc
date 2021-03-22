const user = require("../controllers/userController");
var router = require("express").Router();

router.post("/create", user.create);

router.put("/update/:id", user.update);

router.delete("/delete/:id", user.delete);

router.get("/getall", user.getAll);

router.get("/getbyid/:id", user.getByid);

router.get("/search/:name", user.search);

module.exports = router;
