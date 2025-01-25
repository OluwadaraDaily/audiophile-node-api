const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  timezone: 'Z',
  supportBigNumbers: true,
  bigNumberStrings: true
});

// Test the connection by getting a connection from the pool
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL successfully!');
    connection.release();
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
  }
})()

module.exports = pool;