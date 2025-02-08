const transporter = require("../config/mail/mailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail }