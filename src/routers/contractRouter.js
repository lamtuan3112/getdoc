const contract = require("../controllers/contractController");
var router = require("express").Router();

router.post("/create", contract.create);

router.put("/update/:id", contract.update);

router.delete("/delete/:id", contract.delete);

router.get("/getall", contract.getAll);

router.get("/getemployee", contract.getEmployee);

router.get("/getuser", contract.getUser);

router.get("/getbyid/:id", contract.getByid);

router.get("/getrevenue", contract.getRevenue);

module.exports = router;
