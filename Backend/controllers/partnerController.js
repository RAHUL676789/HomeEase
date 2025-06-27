const partnerModel = require("../models/partnerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../Helper/sendOtp.js");
const { storedOtp } = require("../Helper/otpSerivce.js");





module.exports.signup = async (req, res, next) => {
  // const {city,fullName,state,pincode,password,email}= req.body;
  console.log(req.body);
  res.status(200).json({ message: "success" })

}



module.exports.otpSend = async (req, res, next) => {

  const otp = Math.floor(1000 + Math.random() * 9000);
  const { email } = req.body;


  if (!email) {
    return res.status(404).json({ message: "email id required", success: false });
  }

  await sendOTP(email, otp);
  await storedOtp(email, otp);
  return res.status(200).json({ message: `otp sent to ${email} please verify`, success: true });


}