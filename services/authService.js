require('dotenv').config({ path: "../.env" });

const db = require("../config/db/db");
const bcrypt = require('bcrypt');
const userService = require("./userService");
const emailService = require("./mailService");

const BASE_URL = process.env.BASE_URL

const registerUser = async (userInfo) => {
  const { first_name, last_name, email, password } = userInfo;
  const user = await userService.getUserByEmail(email)
  if (user) {
    throw new Error(`User with email(${email}) already exists`)
  }

  const hashedPassword = await hashPassword(password);
  const token = await generateToken();

  // Token will expire in 2 hours
  let tokenExpiryDate = new Date()
  tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 2)

  // Send user email
  await sendVerificationMail({ firstName: first_name, email, token })
  
  await db('users').insert({
    first_name,
    last_name,
    email,
    password:hashedPassword,
    is_activated: false,
    token,
    token_expiry: tokenExpiryDate
  })

  const registeredUser = await userService.getUserByEmail(email);
  return registeredUser;
}

const sendVerificationMail = async ({ firstName, email, token }) => {
  const emailOptions = {
    to: [email],
    subject: 'Verify your account',
    text: `Hello, ${firstName}. Your token for activation is ${token}`,
    html: `<p>Hello, ${firstName},</p>
         <p>Click the link below to verify your account:</p>
         <a href="${BASE_URL}/auth/activate?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Account</a>
         <p>If you have trouble clicking the button, you can also use this link:</p>
         <p><a href="${BASE_URL}/auth/verify?token=${token}">${BASE_URL}/auth/activate?token=${token}</a></p>`
  }

  await emailService.sendEmail(emailOptions)
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

const generateToken = async (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123567890'
  let token = ""
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * length)]
  }
  return token
}

const verifyToken = async (token) => {
  let query = db('users').whereNotNull('token')
  // Check if token exists
  const userHasToken = await query.where({ token }).first()

  if (!userHasToken) {
    return {
      message: `User with token (${token}) does not exist`
    }  
  }
  
  // Check if token has expired
  const tokenHasExpired = await query.where({ is_activated: false }).where('token_expiry', '<', db.raw("NOW()"))
  
  if (tokenHasExpired) {
    return {
      message: `Token has expired`
    }
  }

  // Update user
  await db('users').where({ id: userHasToken.id }).update({
    token: null,
    token_expiry: null,
    is_activated: true
  })

  const user = await db('users').where({ id: userHasToken.id }).first();

  const safeUser = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    is_activated: user.is_activated
  }

  return {user: safeUser}
}


module.exports = {
  registerUser,
  verifyToken
}