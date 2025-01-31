const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require("../middlewares/validators/authValidator")
const validate = require("../middlewares/validators/validate");

router.post('/', authController.login)

router.post('/register',  authValidator.registerValidator, validate, authController.register)

module.exports = router;
