const OnHeaders = require("on-headers");

exports.registerOnHeadersListener = (req, res, next) => {
  OnHeaders(res, () => res.removeHeader("ETag"));
  next();
};