const productRouter = require("express").Router();
const {
  getIndexPage,
  getAddProductPage,
} = require("../controller/product.controller");
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");

productRouter.get("/", registerOnHeadersListener, getIndexPage);

productRouter.get("/product/add", registerOnHeadersListener, getAddProductPage);

module.exports = productRouter;
