



// middleware/validateSignup.js
const { body, validationResult } = require("express-validator");

module.exports.validateSignup = [
   body("fullName").notEmpty().withMessage("fullName is required"),
   body("email").isEmail().withMessage("invalid email format"),
   body("phone").matches(/^\d{10}$/).withMessage("phone must be 10 digit"),
   body("password").isLength({min:6}).withMessage("password should be at least 6 character"),

   (req,res,next)=>{
    console.log("otpv verifying")
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        console.log("hello")
        return res.status(400).json({message:"validation failed",errors:errors.array()})
    }
    next();

   }
];




module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.session || req.session.user){
        return res.status(401).json({message:"unauthorize user",success:false})
    }
    next();
}

module.exports.isOwner = (req,res,next) =>{
    console.log("isowner");
    next();
}





