const orderRouter = require("express").Router();

const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");
const { isAuth } = require("../../common/middleware/is-auth.middleware");
const {
  getOrderPage,
  postAddOrder,
  getSucessPage,
} = require("../controller/order.controller");

orderRouter.get("/", registerOnHeadersListener, isAuth, getOrderPage);

orderRouter.post("/add", registerOnHeadersListener, isAuth, postAddOrder);

orderRouter.get("/success", registerOnHeadersListener, isAuth, getSucessPage);

module.exports = orderRouter;
