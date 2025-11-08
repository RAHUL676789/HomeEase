



// middleware/validateSignup.js
const { body, validationResult } = require("express-validator");
const adminModel = require("./models/adminSchema");
const userModel = require("./models/userModel");
const partnerModel = require("./models/partnerSchema");
const Booking = require("./models/bookingModel")

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


module.exports.validateUsersignup = [
  body("fullName").notEmpty().withMessage("fullName is required").isLength({ min: 3 }).withMessage("fullName should be at least 3 character"),
  body("email").isEmail().withMessage("email should be valid"),
  body("password").isLength({ min: 6 }).withMessage("password should be at least 6 character"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "validation failed", errors: errors.array() })
    }
    next()
  }
]



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



module.exports.validateBooking = [
  body("user")
    .trim()
    .notEmpty().withMessage("user is required")
    .isMongoId().withMessage("Invalid user ID format"),

  body("provider")
    .trim()
    .notEmpty().withMessage("partner is required")
    .isMongoId().withMessage("Invalid partner ID format"),
  body("service")
    .trim()
    .notEmpty().withMessage("service is required")
    .isMongoId().withMessage("Invalid Service ID format"),

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



]


module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.session)
  console.log("req.session.user", req.session.user)

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
  const { email } = req.body;


  if (!email) {
    return res.status(400).json({ message: "email is required", success: false })
  }

  const existAny = await Promise.any([
    adminModel.findOne({ email }),
    partnerModel.findOne({ email }),
    userModel.findOne({ email })
  ]).catch(() => null)


  if (existAny) {
    return res.status(409).json({ message: "email is already exist", success: false })
  }
  next();

}



module.exports.isPhoneExist = async (req, res, next) => {
  const { phone } = req.body;


  if (!phone) {
    return res.status(400).json({ message: "phone no is required", success: false })
  }

  const existAny = await Promise.any([
    adminModel.findOne({ phone }),
    partnerModel.findOne({ phone }),
    userModel.findOne({ phone })
  ]).catch(() => null)


  if (existAny) {
    return res.status(409).json({ message: "phone is already exist", success: false })
  }
  next();

}


module.exports.isValidPartner = async (req, res, next) => {

  const { id } = req.params;


  const booking = await Booking.findById(id).populate("provider");


  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const providerId = booking?.provider?._id?.toString();
  const loggedInUserId = req?.session?.user?._id?.toString();

  if (providerId === loggedInUserId) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized user" });




};


module.exports.isValidSessionUser = async (req, res, next) => {

  if (!req.session.user) return res.status(401).json({ message: "Unauthorized user", success: false });
  const { _id } = req.session.user;
  console.log(_id);
  

  const [user, partner, admin] = await Promise.allSettled([userModel.findById(_id), partnerModel.findById(_id), adminModel.findById(_id)]);

  const foundUser = user?.status === "fulfilled" && user.value ? user.value : partner.status === "fulfilled" && partner.value ? partner.value : admin.status === "fulfilled" && admin.value ? admin.value : null;

  if (!foundUser) {
    return res.status(403).json({ message: "invalid session user or session expired please try again later", success: false })
  }

  if (req?.session?.user?._id?.toString() !== foundUser?._id?.toString()) {
    return res.status(401).json({ message: "Unauthorized user", success: false });
  }


  next()
}



module.exports.verifyUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized user", success: false })
  }
  const {_id} = req.session.user;
  const currentBooking = await Booking.findById(id);
  console.log("this is current booking",currentBooking)
  console.log(currentBooking.user.toString() === _id.toString())
  if (currentBooking.user.toString() !== _id.toString() ) {
    return res.status(401).json({ message: "Unauthorized user", success: false })
  }

  next();

}