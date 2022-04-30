const express = require('express');
const path = require('../utils/dirRoot.util');

function viewConfig(app){
  app.set('view-engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.urlencoded({extended: false}));
  app.use(express.static(path.join(__dirname, 'public')));
}

module.exports = viewConfig;