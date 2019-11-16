const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require("../../config/config.json")[env];

console.log(config);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
global.sequelize = sequelize;