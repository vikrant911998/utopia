const express = require("express");
const dotenv = require("dotenv");
const debug = require("debug");
dotenv.config();

// Utils
const utopiaDB = require("./utils/db.util");
// Configs
const loggerConfig = require("./configs/logger.config");
const viewConfig = require("./configs/view.config");
const { sessionConfig, sessionStore } = require("./configs/session.config");
const fileUploadConfig = require("./configs/fileUpload.config");
// Routes
const authRoutes = require("./auth/routes/auth.route");
const productRoutes = require("./product/routes/product.route");
const cartRoutes = require("./cart/routes/cart.route");
const orderRoutes = require("./order/routes/order.route")
const commonRoutes = require('./common/routes/common.route')
// Models
const User = require("./auth/model/auth.model");
const Product = require("./product/model/product.model");
const Cart = require("./cart/model/cart.model");
const Order = require("./order/model/order.model");

const UtopiaApp = express();
loggerConfig(UtopiaApp);
viewConfig(UtopiaApp);
sessionConfig(UtopiaApp);
fileUploadConfig(UtopiaApp);
UtopiaApp.use("/auth", authRoutes);
UtopiaApp.use(productRoutes);
UtopiaApp.use("/cart", cartRoutes);
UtopiaApp.use("/order", orderRoutes);
UtopiaApp.use(commonRoutes);

const debugLog = debug("utopia:index");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasOne(Cart);
Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Order);

UtopiaApp.use((req, res) => {
  res.render('error', {
    pageTitle: 'Error 404 | Utopia',
    user: undefined,
  });
});

utopiaDB
  .sync({
    // force: true,
  })
  .then(() => {
    sessionStore.sync();
    debugLog("Database connected successfully");
    UtopiaApp.listen(process.env.PORT || 1234, portListenCallback);
  })
  .catch((err) => {
    debugLog(err);
  });

function portListenCallback() {
  console.log("server is listening at: ", process.env.PORT || 1234);
}
