const authRouter = require('express').Router();
const authController = require('../controller/auth.controller');

authRouter.get('/', authController.getAuthenticationPage);

module.exports = authRouter;