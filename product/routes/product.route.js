const productRouter = require("express").Router();
const {
  getIndexPage,
  getAddProductPage,
  postAddProduct,
  getProductListPage,
  postDeleteProduct,
  getEditProduct,
  postUpdateProduct,
  getShopPage,
  getSingleProdPage,
} = require("../controller/product.controller");
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");
const { isAuth } = require("../../common/middleware/is-auth.middleware");

productRouter.get("/", registerOnHeadersListener, getIndexPage);

productRouter.get("/product/shop" , registerOnHeadersListener, getShopPage);

productRouter.get(
  "/product/add",
  registerOnHeadersListener,
  isAuth,
  getAddProductPage
);

productRouter.get("/product/edit", registerOnHeadersListener, getEditProduct);

productRouter.get(
  "/product/list",
  registerOnHeadersListener,
  isAuth,
  getProductListPage
);

productRouter.get("/product/single-product-page" ,registerOnHeadersListener,getSingleProdPage)

productRouter.post("/product/add", registerOnHeadersListener, postAddProduct);

productRouter.post(
  "/product/delete",
  registerOnHeadersListener,
  isAuth,
  postDeleteProduct
);

productRouter.post(
  "/product/update",
  registerOnHeadersListener,
  isAuth,
  postUpdateProduct
);

module.exports = productRouter;
