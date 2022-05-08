const productRouter = require("express").Router();
const { getIndexPage } = require("../controller/product.controller");
const {
  registerOnHeadersListener,
} = require("../../common/middleware/common.middleware");

productRouter.get("/", registerOnHeadersListener, getIndexPage);

module.exports = productRouter;
