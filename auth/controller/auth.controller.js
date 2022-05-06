const UserModel = require("../model/auth.model");
const authService = require("../services/auth.service");
const utopiaDB = require("../../utils/db.util");
const debug = require("debug");

const debugLog = debug("utopia:auth-controller");

exports.getAuthenticationPage = (req, res, next) => {
  res.render("auth/auth", {
    pageTitle: "Authentication | Utopia",
    isRegister: true,
    isError: false,
    errorMsg: "",
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  debugLog(email, password);
  try {
    const dbUser = await UserModel.findOne({ where: { email: email } });
    debugLog("User Find:  ", dbUser);
    if (dbUser && dbUser.dataValues) {
      const user = dbUser.dataValues;
      const passwordCheck = await authService.validatePassword(
        password,
        user.password
      );
      debugLog("Login password check: ", passwordCheck);
      if (passwordCheck) {
        debugLog("Password Check Successful");
        console.log("Password Check Successful");
        req.session.isLogin = true;
        req.session.user = user;
        res.redirect("/");
      } else {
        res.render("auth/auth", {
          pageTitle: "Authentication | Utopia",
          isRegister: false,
          isError: true,
          errorMsg: "Incorrect email and password",
        });
      }
    } else {
      res.render("auth/auth", {
        pageTitle: "Authentication | Utopia",
        isRegister: false,
        isError: true,
        errorMsg: "User with this email not exist",
      });
    }
  } catch (error) {
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: false,
      isError: true,
      errorMsg: "Some Error Occured",
    });
  }
};

exports.postRegister = async (req, res) => {
  const t = await utopiaDB.transaction();
  try {
    const { email, password } = req.body;
    const hashedPassword = await authService.hashPassword(password);
    await UserModel.create(
      {
        email: email,
        password: hashedPassword,
      },
      { transaction: t }
    );
    await t.commit();
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: false,
      isError: false,
      errorMsg: "",
    });
  } catch (err) {
    await t.rollback();
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: true,
      isError: true,
      errorMsg: "Some Error Occured",
    });
  }
};

exports.postLogout = async (req, res) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/auth");
  });
};
