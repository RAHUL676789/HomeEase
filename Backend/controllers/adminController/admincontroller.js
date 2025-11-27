
const sendOTP = require("../../Helper/sendOtp.js");
const Admin = require("../../models/adminSchema.js")
const { storedOtp: savedOtp, verifyOtp } = require("../../Helper/otpSerivce.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




module.exports.loginOtpRequest = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required", success: false });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "admin not found", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: "invalid credentials", success: false });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const storedOtp = await savedOtp(email, otp);
    if (!storedOtp) {
      return res.status(500).json({ message: "failed to store otp", success: false });
    }

    const send = await sendOTP(email, otp);
    if (!send) {
      return res.status(500).json({ message: "failed to send otp", success: false });
    }

    return res.status(200).json({
      message: "otp has been sent to your email",
      success: true
    });

  
};


module.exports.verifyLoginOtp = async (req, res, next) => {

    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res.status(400).json({
        message: "email, password and otp are required",
        success: false
      });
    }

 
    const otpMatch = await verifyOtp(email, otp);
    if (!otpMatch) {
      return res.status(401).json({ message: "invalid otp", success: false });
    }

  
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "admin not found", success: false });
    }

  
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: "invalid credentials", success: false });
    }

    
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      path: "/"
    });

 
    admin = admin.toObject();
    delete admin.password;

    req.session.user = admin;

    return res.status(200).json({ message: "login successfully", success: true, data:admin });


};
