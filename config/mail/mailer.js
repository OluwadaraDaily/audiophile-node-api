const nodemailer = require('nodemailer');
require('dotenv').config({ path: "../.env" });

const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  maxConnections: 5,
  maxMessages: 10,
});

module.exports = transporter;