const employee = require("../controllers/employeeController");
var router = require("express").Router();

router.post("/create", employee.create);

router.put("/update/:id", employee.update);

router.delete("/delete/:id", employee.delete);

router.get("/getall", employee.getAll);

router.get("/search/:name", employee.search);

router.get("/getbyid/:id", employee.getByid);

module.exports = router;
