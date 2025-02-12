require('dotenv').config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const refreshAccessToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401); // No refresh token

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Refresh token invalid/expired

    // Generate new tokens
    const newAccessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
    const newRefreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    // Update refresh token (rotation)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    req.user = user;
    return next();
  })
}

module.exports = {
  authenticateToken,
  refreshAccessToken
}