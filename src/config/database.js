const Sequelize = require("sequelize");
const sequelize = new Sequelize("studio", "postgres", "lamtuan3112", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const Op = Sequelize.Op;

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contract = require("../models/contractModel")(sequelize, Sequelize);
db.employee = require("../models/employeeModel")(sequelize, Sequelize);
db.account = require("../models/accountModel")(sequelize, Sequelize);
db.user = require("../models/userModel")(sequelize, Sequelize);


// liên kết bảng

db.contract.belongsTo(db.employee, {
  as: "employeeInfo",
  foreignKey: "employeeId",
});

db.contract.belongsTo(db.user, {
  as: "userInfo",
  foreignKey: "userId",
});

// db.account.belongsTo(db.employee,{
//   as: "employeeinfo",
//   foreignKey: "email",
// });

module.exports = db;
