const employee = require("../controllers/getdocController");
var router = require("express").Router();

router.get("/getauth/:id", employee.getAuth);

router.get("/gettenderapplication", employee.getTenderApplication);

router.get("/getpricelist", employee.getPriceList);

module.exports = router;
