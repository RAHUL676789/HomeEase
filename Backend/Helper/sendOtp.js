const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass:"bpln lzad fumv akzo"
    }
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "HomeEase - OTP Verification",
    html: `<h2>Your OTP is: ${otp}</h2><p>It is valid for 10 minutes.</p>`
  };

  await transporter.sendMail(mailOptions);
  return true;
};

module.exports = sendOTP;
