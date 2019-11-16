const sequelize = require("../database/connection");
const Sequelize = require("sequelize");

module.exports = sequelize.define('order', {
  items: Sequelize.STRING(35),
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
});
