const sequelize = require("../database/connection");
const Sequelize = require("sequelize");

module.exports = () => {
  const Order = sequelize.define('Order', {
    items: Sequelize.INTEGER,
    order: Sequelize.STRING
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};