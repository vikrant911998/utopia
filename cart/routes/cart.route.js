const cartRouter = require('express').Router();
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");
const { isAuth } = require("../../common/middleware/is-auth.middleware");
const { addProductInCart, getCartPage, deleteProductInCart } = require("../controller/cart.controller");

cartRouter.get('/', registerOnHeadersListener, isAuth, getCartPage);

cartRouter.post('/delete', registerOnHeadersListener, isAuth, deleteProductInCart);

cartRouter.post('/add', registerOnHeadersListener, isAuth, addProductInCart);

module.exports = cartRouter;