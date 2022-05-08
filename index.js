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
// Models
const User = require("./auth/model/auth.model");
const Product = require("./product/model/product.model");

const UtopiaApp = express();
loggerConfig(UtopiaApp);
viewConfig(UtopiaApp);
sessionConfig(UtopiaApp);
fileUploadConfig(UtopiaApp);
UtopiaApp.use("/auth", authRoutes);
UtopiaApp.use(productRoutes);

const debugLog = debug("utopia:index");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

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
