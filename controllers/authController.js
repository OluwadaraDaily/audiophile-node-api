require('dotenv').config({ path: "../.env" });
const authService = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser({ email, password });
    
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: true, // Use HTTPS
      sameSite: "Strict", // CSRF protection
    });
    
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message: error.message || "An error occurred" })
  }
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
    const userWithToken = await authService.verifyToken(token)
    
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

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newTokens = authService.generateJWTTokens({ id: user.userId });

    res.cookie("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ accessToken: newTokens.accessToken });
  });
}

const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
}

module.exports = {
  login,
  register,
  activate,
  refreshToken,
  logout
}