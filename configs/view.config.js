const express = require("express");
const nocache = require("nocache");
const path = require("path");
const rootDirPath = require("../utils/dirRoot.util");

function viewConfig(app) {
  app.set("view engine", "ejs");
  app.set("views", path.join(rootDirPath, "views"));
  app.set("etag", false);
  app.use(nocache());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(rootDirPath, "public")));
}

module.exports = viewConfig;
