const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS, // ✅ password env me rakho
      },
    });

    const mailOptions = {
      from: `"HomeEase" <${process.env.MAIL_ID}>`,
      to: email,
      subject: "HomeEase - OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Your OTP is: <span style="color:#2563eb;">${otp}</span></h2>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "OTP sent successfully to your email",
    };
  } catch (error) {
    console.error("Email send error:", error);
     
    // ✅ Specific error handling for non-existing email
    if (error.response && error.response.includes("550-5.1.1")) {
      return {
        success: false,
        message: "This email address does not exist. Please check and try again.",
      };
    }

    // ✅ Fallback generic error
    return {
      success: false,
      message: "Failed to send OTP. Please try again later.",
    };
  }
};

module.exports = sendOTP;
