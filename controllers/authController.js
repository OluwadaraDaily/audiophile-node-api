const authService = require('../services/authService');

const login = async (req, res, next) => {
  console.log('BODY =>', req.body)
}

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const registeredUser = await authService.registerUser({ first_name, last_name, email, password })
    return res.status(201).json({
      ...registeredUser
    })
  } catch (error) {
    return res.status(500).json({ message: error.message || "An error occurred" })
  }
}

const activate = async (req, res) => {
  try {
    const { token } = req.query
    console.log('TOKEN =>', token)
    const userWithToken = await authService.verifyToken(token)
    
    console.log("userWithToken =>", userWithToken)
    
    if (!userWithToken.user) {
      return res.status(400).json({
        message: userWithToken.message
      })
    }
    return res.status(200).json({
      message: "You have been verified!",
      ...userWithToken
    })
  } catch (error) {
    res.status(500).json({ message: error.message || "An error occurred" })
  }
}

module.exports = { login, register, activate }