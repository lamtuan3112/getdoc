const Sequelize = require("sequelize");
const sequelize = require("../config/database").sequelize;

module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("accounts", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.TEXT,
    },
    username: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.TEXT,
    }
  });

  return Account;
};