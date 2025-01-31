const db = require("../config/db/db");

const getUserByEmail = async (email) => {
  let user = await db('users').where({ email }).first();

  if (!user) return null
  
  const { id, first_name, last_name, email: safeUserEmail } = user;

  const safeUser = {
    id,
    first_name,
    last_name,
    email: safeUserEmail,
  }

  return safeUser;
}

module.exports = {
  getUserByEmail
}