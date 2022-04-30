const express = require('express');

const UtopiaApp = express();


UtopiaApp.listen(process.env.PORT || 1234, portListenCallback);

function portListenCallback() {
  console.log('server is listening at: ', process.env.PORT || 1234);
}