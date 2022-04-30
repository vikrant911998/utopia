const express = require("express");
const dotenv = require("dotenv");
const debug = require('debug');
dotenv.config();

// Utils
const utopiaDB = require("./utils/db.util");
// Configs
const loggerConfig = require('./configs/logger.config');
const viewConfig = require('./configs/view.config');

const UtopiaApp = express();
loggerConfig(UtopiaApp);
viewConfig(UtopiaApp);

const debugLog = debug('utopia:index');

utopiaDB
  .sync()
  .then(() => {
    debugLog('Database connected successfully');
    UtopiaApp.listen(process.env.PORT || 1234, portListenCallback);
  })
  .catch((err) => {
    debugLog(err);
  });

function portListenCallback() {
  console.log("server is listening at: ", process.env.PORT || 1234);
}
