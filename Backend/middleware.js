



// middleware/validateSignup.js
const { body, validationResult } = require("express-validator");
const adminModel = require("./models/adminSchema");
const userModel = require("./models/userModel");
const partnerModel = require("./models/partnerSchema");

module.exports.validateSignup = [
  body("fullName").notEmpty().withMessage("fullName is required"),
  body("email").isEmail().withMessage("invalid email format"),
  body("phone").matches(/^\d{10}$/).withMessage("phone must be 10 digit"),
  body("password").isLength({ min: 6 }).withMessage("password should be at least 6 character"),

  (req, res, next) => {
    console.log("otpv verifying")
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      console.log("hello")
      return res.status(400).json({ message: "validation failed", errors: errors.array() })
    }
    next();

  }
];




module.exports.validateLoginPartner = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        errors: errors.array(),
      });
    }

    next();
  }
];



module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.session)

  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized user", success: false });
  }
  next();
};


module.exports.isOwner = (req, res, next) => {
  console.log("isowner");
  next();
}



module.exports.isEmailExist = async (req, res, next) => {
  const { email }= req.body;


  if (!email) {
    return res.status(400).json({ message: "email is required", success: false })
  }

  const existAny = await Promise.any([
    adminModel.findOne({ email }),
    partnerModel.findOne({ email }),
    userModel.findOne({ email })
  ]).catch(()=>null)


  if(existAny){
    return res.status(409).json({message:"email is already exist",success:false})
  }
  next();

}



module.exports.isPhoneExist = async (req, res, next) => {
  const { phone }= req.body;


  if (!phone) {
    return res.status(400).json({ message: "phone no is required", success: false })
  }

  const existAny = await Promise.any([
    adminModel.findOne({ phone }),
    partnerModel.findOne({ phone }),
    userModel.findOne({ phone })
  ]).catch(()=>null)


  if(existAny){
    return res.status(409).json({message:"phone is already exist",success:false})
  }
  next();

}

