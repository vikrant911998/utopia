const commonRouter = require("express").Router();

const { getBlogPage, getAboutPage, getContactPage } = require("../controller/common.controller");
const { registerOnHeadersListener } = require("../middleware/common.middleware");


commonRouter.get('/blog',registerOnHeadersListener,getBlogPage);

commonRouter.get('/about',registerOnHeadersListener,getAboutPage);

commonRouter.get('/contact',registerOnHeadersListener,getContactPage);

module.exports = commonRouter;