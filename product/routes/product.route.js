const productRouter = require("express").Router();
const {
  getIndexPage,
  getAddProductPage,
  postAddProduct,
  getProductListPage,
} = require("../controller/product.controller");
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");

productRouter.get("/", registerOnHeadersListener, getIndexPage);

productRouter.get("/product/add", registerOnHeadersListener, getAddProductPage);

productRouter.get("/product/list", registerOnHeadersListener, getProductListPage);

productRouter.post("/product/add", registerOnHeadersListener, postAddProduct);

module.exports = productRouter;
