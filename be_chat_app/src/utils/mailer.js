const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,    
    pass: process.env.EMAIL_PASSWORD  
  }
});

exports.sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"no-reply" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};