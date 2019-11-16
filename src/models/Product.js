const sequelize = require("../database/connection");
const Sequelize = require("sequelize");

module.exports = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(35),
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  },
  isInShoppingCart: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false 
  },
  shoppingCartNumber: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  }
});