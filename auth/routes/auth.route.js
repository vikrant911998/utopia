const authRouter = require('express').Router();
const authController = require('../controller/auth.controller');

authRouter.get('/', authController.getAuthenticationPage);

authRouter.post('/register', authController.postRegister);

module.exports = authRouter;