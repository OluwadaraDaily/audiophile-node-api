const authService = require('../services/authService');

const login = async (req, res, next) => {
  console.log('BODY =>', req.body)
}

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const registeredUser = await authService.registerUser({ first_name, last_name, email, password })
    res.status(201).json({
      ...registeredUser
    })
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred" })
  }
}

module.exports = { login, register }