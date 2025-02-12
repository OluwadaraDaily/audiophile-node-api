const db = require("../config/db/db");

const getUserByEmail = async (email) => {
  let user = await db('users').where({ email }).first();

  if (!user) {
    throw new Error(`User with email (${email}) not found`)
  }
  
  const { id, first_name, last_name, email: safeUserEmail, password, is_activated } = user;

  const safeUser = {
    id,
    first_name,
    last_name,
    email: safeUserEmail,
    password,
    is_activated
  }

  return safeUser;
}

module.exports = {
  getUserByEmail
}