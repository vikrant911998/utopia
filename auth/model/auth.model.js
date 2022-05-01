const Sequelize = require('sequelize');
const utopiaDB = require('../../utils/db.util');

const UserModel = utopiaDB.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = UserModel;