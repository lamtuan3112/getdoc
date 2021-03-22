const Sequelize = require("sequelize");
const sequelize = require("../config/database").sequelize;

module.exports = (sequelize, Sequelize) => {
  const Contract = sequelize.define("contracts", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: "users",
        foreignKey: "id",
      },
    },
    year: {
      type: Sequelize.TEXT,
    },
    address: {
      type: Sequelize.TEXT,
    },
    service: {
      type: Sequelize.TEXT,
    },
    phone: {
      type: Sequelize.TEXT,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    employeeId: {
      type: Sequelize.UUID,
      references: {
        model: "employees",
        foreignKey: "id",
      },
    },
    date: {
      type: Sequelize.TEXT,
    },
  
  });

  return Contract;
};