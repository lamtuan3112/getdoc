const Sequelize = require("sequelize");
const sequelize = require("../config/database").sequelize;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.TEXT,
    },
    gender: {
      type: Sequelize.TEXT,
    },
    year: {
      type: Sequelize.TEXT,
    },
    idNo: {
      type: Sequelize.TEXT,
    },
    email: {
      type: Sequelize.TEXT,
    },
    adress: {
      type: Sequelize.TEXT,
    },
    phone: {
      type: Sequelize.TEXT,
    },
  });

  return User;
};