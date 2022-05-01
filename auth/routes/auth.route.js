const authRouter = require('express').Router();
const authController = require('../controller/auth.controller');

authRouter.get('/register', authController.getRegisterPage);

module.exports = authRouter;