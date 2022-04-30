const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// Utils
const utopiaDB = require("./utils/db.util");

const UtopiaApp = express();

utopiaDB
  .sync()
  .then(() => {
    console.log('DB connected');
    UtopiaApp.listen(process.env.PORT || 1234, portListenCallback);
  })
  .catch((err) => {
    console.log('error : ', err)
  });

function portListenCallback() {
  console.log("server is listening at: ", process.env.PORT || 1234);
}
