const { DataTypes } = require("sequelize");
const sequelize = require("../database/bd");

const Product = sequelize.define("Product", {
  responsible: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artwork: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  operator: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destiwork: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
