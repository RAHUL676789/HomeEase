const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyOtp, storedOtp } = require("../Helper/otpSerivce");
const userModel = require("../models/userModel.js");
const sendOTP = require("../Helper/sendOtp.js");




module.exports.sendOtp = async(req,res,next)=>{
    console.log("user sednotp")
    const {email} = req.body;
    console.log("this is user sing up body",req.body);
    if(!email) return res.status(400).json({message:"email is required",success:false});
    const otp = Math.floor(1000 + Math.random() * 9000);
      const store = await storedOtp(email,otp);
    if(!store)return res.status(500).json({message:"internal server error please again ",success:false});
    const send = await sendOTP(email,otp);
    console.log(send);
    if(!send.success)return res.status(500).json({message:"unable to send otp",success:false});
  
   return res.status(200).json({ message: `otp sent to ${email} please verify`, success: true });
}





module.exports.userSignup = async (req, res, next) => {
    const { fullName, email, password, otp } = req.body;
   const isUserExist = await userModel.findOne({email});
   if(isUserExist){
    return res.status(403).json({message:"User already register with this email",success :false})
   }
       const otpVerify = await verifyOtp(email, otp);
    if (!otpVerify) {
        return res.status(400).json({ message: "otp validation failed", success: false })
    }


    const salt =await bcrypt.genSalt(10);
    const hashPassword =await bcrypt.hash(password, salt);
    const newUser = new userModel({
        fullName,
        email,
        password: hashPassword

    })

    let savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.JWTSECRET, { expiresIn: "1d" })
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
    })
   
    savedUser = savedUser.toObject();
    delete savedUser.password;
    return res.status(200).json({ message: "register successfully", success: true, data: savedUser })
}