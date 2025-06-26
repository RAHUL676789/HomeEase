const partnerModel = require("../models/partnerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../Helper/sendOtp.js");





module.exports.signup = async(req,res,next)=>{
    // const {city,fullName,state,pincode,password,email}= req.body;
    console.log(req.body);
    res.status(200).json({message:"success"})

}

const otpStore = {};

module.exports.otpSend = async (req,res,next)=>{
  console.log("this is otpsend re")
  const otp = Math.floor(1000 + Math.random() * 9000);
  const {email} = req.body;
  console.log(email);

  if(!email){
    return res.status(404).json({message:"email id required",success:false});
  }

  await sendOTP(email,otp);

  otpStore[email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // valid for 10 minutes
      verified: false
    };

   return res.status(200).json({message:`otp sent to ${email} please verify`,success:true});

  
}