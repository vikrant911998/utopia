const { v4: uuidv4 } = require("uuid");
const CartModel = require("../../cart/model/cart.model");
const OrderModel = require("../model/order.model");
const { clearCart } = require("../../cart/controller/cart.controller");

exports.getOrderPage = async (req, res) => {
  const userId = req.session.user.id;
  const dbOrders = await OrderModel.findAll({ where: { userId } });
  let orders = dbOrders.map(dbOrder=>dbOrder.dataValues);
  orders = orders.map((order) => ({
    ...order,
    products: JSON.parse(order.products),
  }));
  res.render("order/order", {
    pageTitle: "Orders | Utopia",
    path: "order",
    isLogin: req.session.isLogin,
    user: req.session.user,
    orders,
  });
};

exports.getSucessPage = async(req,res)=>{
  res.render("order/order-success", {
    pageTitle: "Order-success | Utopia",
    path: "order-success",
    isLogin: req.session.isLogin,
    user: req.session.user,
  })
}

exports.postAddOrder = async (req, res) => {
  const userId = req.session.user.id;
  const cartId = req.body.cartId;
  const dbCart = await CartModel.findOne({ where: { id: cartId } });
  const cart = dbCart.dataValues;
  try {
    await OrderModel.create({
      orderId: uuidv4(),
      products: cart.products,
      totalPrice: cart.totalPrice,
      userId,
    });
    await clearCart(userId);
    res.redirect("/order/success");
  } catch (error) {
    console.log(error);
  }
};
