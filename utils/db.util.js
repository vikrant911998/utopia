const Sequelize = require('sequelize');

// Sequelize takes 4 arguments
// 1. DB Name
// 2. DB User
// 3. DB Password
// 4. Options Object
const utopiaDB = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);

module.exports = utopiaDB;