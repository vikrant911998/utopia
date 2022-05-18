const Sequelize = require('sequelize');
const utopiaDB = require('../../utils/db.util');

const CartModel = utopiaDB.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  products: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }
});

module.exports = CartModel;