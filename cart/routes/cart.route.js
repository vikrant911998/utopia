const cartRouter = require('express').Router();
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");
const { isAuth } = require("../../common/middleware/is-auth.middleware");
const { addProductInCart } = require("../controller/cart.controller");

cartRouter.get('/', registerOnHeadersListener, isAuth,);

cartRouter.post('/add', registerOnHeadersListener, isAuth, addProductInCart);

module.exports = cartRouter;