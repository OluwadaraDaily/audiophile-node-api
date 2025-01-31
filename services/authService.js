const db = require("../config/db/db");
const bcrypt = require('bcrypt');
const userService = require("./userService");
const {
  randomBytes,
} = require('node:crypto');

const registerUser = async (userInfo) => {
  const { first_name, last_name, email, password } = userInfo;
  const user = await userService.getUserByEmail(email)
  if (user) {
    throw new Error(`User with email(${email}) already exists`)
  }

  const hashedPassword = await hashPassword(password);
  const { token, hashedToken } = await generateToken();

  // Token will expire in 2 hours
  let tokenExpiryDate = new Date()
  tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 2)
  
  await db('users').insert({
    first_name,
    last_name,
    email,
    password:hashedPassword,
    is_activated: false,
    token: hashedToken,
    token_expiry: tokenExpiryDate
  })

  const registeredUser = await userService.getUserByEmail(email);
  return registeredUser;
}

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

const generateToken = async () => {
  const token = randomBytes(32).toString('hex');
  const saltRounds = 10;
  const hashedToken = await bcrypt.hash(token, saltRounds);
  return { token, hashedToken }
}


module.exports = {
  registerUser
}