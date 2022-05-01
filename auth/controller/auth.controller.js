const UserModel = require("../model/auth.model");
const utopiaDB = require("../../utils/db.util");

exports.getAuthenticationPage = (req, res, next) => {
  res.render("auth/auth", {
    pageTitle: "Authentication | Utopia",
    isRegister: true,
    isError: false,
  });
};

exports.postRegister = async (req, res) => {
  const t = await utopiaDB.transaction();
  try {
    const { email, password } = req.body;
    await UserModel.create({ email, password }, { transaction: t });
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: false,
      isError: false,
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    res.render("auth/auth", {
      pageTitle: "Authentication | Utopia",
      isRegister: true,
      isError: true,
    });
  }
};
