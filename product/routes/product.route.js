const productRouter = require("express").Router();
const {
  getIndexPage,
  getAddProductPage,
  postAddProduct,
  getProductListPage,
  postDeleteProduct,
  getEditProduct,
  postUpdateProduct,
} = require("../controller/product.controller");
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");

productRouter.get("/", registerOnHeadersListener, getIndexPage);

productRouter.get("/product/add", registerOnHeadersListener, getAddProductPage);

productRouter.get("/product/edit", registerOnHeadersListener, getEditProduct);

productRouter.get("/product/list", registerOnHeadersListener, getProductListPage);

productRouter.post("/product/add", registerOnHeadersListener, postAddProduct);

productRouter.post("/product/delete", registerOnHeadersListener, postDeleteProduct);

productRouter.post("/product/update", registerOnHeadersListener, postUpdateProduct);

module.exports = productRouter;
