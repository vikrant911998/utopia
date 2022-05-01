const express = require('express');
const path = require('path');
const rootDirPath = require('../utils/dirRoot.util');

function viewConfig(app){
  app.set('view engine', 'ejs');
  app.set('views', path.join(rootDirPath, 'views'));
  app.use(express.urlencoded({extended: false}));
  app.use(express.static(path.join(rootDirPath, 'public')));
}

module.exports = viewConfig;