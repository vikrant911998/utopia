const authRouter = require("express").Router();
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

authRouter.get("/", authController.getAuthenticationPage);

authRouter.post(
  "/register",
  authMiddleware.validatePostRegister,
  authMiddleware.checkIfEmailAlreadyExists,
  authController.postRegister
);

authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
