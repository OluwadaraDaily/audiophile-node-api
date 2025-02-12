const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require("../middlewares/validators/authValidator")
const validate = require("../middlewares/validators/validate");

router.post('/register', authValidator.registerValidator, validate, authController.register)

router.get(`/activate`, authValidator.activateValidator, validate, authController.activate)

router.post(`/login`, authValidator.loginValidator, validate, authController.login)

router.get('/refresh', authController.refreshToken)

module.exports = router;
