const account = require("../controllers/accountController");
var router = require("express").Router();

router.post("/create", account.create);

router.put("/update/:id", account.update);

router.delete("/delete/:id", account.delete);

router.get("/getall", account.getAll);

router.get("/getbyid/:id", account.getByid);

router.post("/login", account.login);

module.exports = router;
