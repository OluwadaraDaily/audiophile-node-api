require('dotenv').config({ path: "../.env" });

const transporter = require("../config/mail/mailer");
const mg = require("../config/mail/mailgun");
const MAILGUN_SANDBOX_URL = 'sandbox657194b28ebb42d98ba1ec4ed620834d.mailgun.org'

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `Audiophile <mailgun@${MAILGUN_SANDBOX_URL}>`,
      to: [...to],
      subject,
      text,
      html
    };

    const info = await mg.messages.create(MAILGUN_SANDBOX_URL, mailOptions);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendEmailWithNodeMailer = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      envelope: {
        from: `Audiophile <${process.env.MAIL_USER}>`,
        to
      },
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail, sendEmailWithNodeMailer }