require('dotenv').config({ path: "../.env" });

console.log("process.env.MAILGUN_API_KEY =>", process.env.MAILGUN_API_KEY);

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

module.exports = mg;