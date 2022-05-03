const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

exports.validatePassword = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};
