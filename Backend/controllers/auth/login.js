const adminModel = require("../../models/adminSchema");
const partnerModel = require("../../models/partnerSchema");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = null;
  let role = null;

  
    // 🔍 Check in User model
    user = await userModel.findOne({ email }).select("fullName email password");
    if (user) role = "User";

    // 🔍 Check in Admin model
    if (!user) {
      user = await adminModel.findOne({ email })
        .select("fullName email password") // admin ke basic fields
        .populate({
          path: "bookings",
          populate: [
            { path: "user" },      // Admin ke liye full user info
            { path: "provider" },  // Admin ke liye full provider info
            { path: "service" },   // Admin ke liye full service info
          ]
        });
      if (user) role = "Admin";
    }

    // 🔍 Check in Partner model
    if (!user) {
      user = await partnerModel.findOne({ email }).populate({
          path: "services",// sirf required service info
          populate: {
            path: "gallery", // sirf required gallery fields
          }
        })
        .populate({
          path: "bookings", // bookings ke required fields
          populate: [
            { path: "user", select: "fullName email" },      
            { path: "service", select: "title description price category" } // Partner ko service ka relevant info
          ]
        });
      if (user) role = "Partner";
    }

    // If user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // 🔐 Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false
      });
    }

    // ✅ Remove password before sending
    user = user.toObject();
    delete user.password;
    req.session.user = user;

    // 🔐 Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, role },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    );

    // 🍪 Set cookie
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: true,
      sameSite: "Strict"
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      data: user,
      role
    });

 
};
