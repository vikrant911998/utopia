const UserModel = require("../model/auth.model");

exports.validatePostRegister = async (req, res, next) => {
  const { password, confirm_password } = req.body;
  if (password !== confirm_password) {
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: true,
      isError: true,
      errorMsg: "Password and Confirm Password not matched",
    });
  } else {
    next();
  }
};

exports.checkIfEmailAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ where: { email: email } });
  if (user) {
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: true,
      isError: true,
      errorMsg: "User with this email already exists",
    });
  } else {
    next();
  }
};
