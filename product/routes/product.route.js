const productRouter = require("express").Router();
const { getIndexPage } = require("../controller/product.controller");

productRouter.get("/", getIndexPage);

module.exports = productRouter;
