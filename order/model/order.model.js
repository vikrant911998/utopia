const Sequelize = require('sequelize');
const utopiaDB = require('../../utils/db.util');

const OrderModel = utopiaDB.define('order', {
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
  orderId:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = OrderModel;