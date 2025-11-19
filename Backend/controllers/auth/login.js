const adminModel = require("../../models/adminSchema");
const partnerModel = require("../../models/partnerSchema");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = null;
  let role = null;

  
    
    user = await userModel.findOne({ email }).populate({path:"bookings",populate:[{path:"provider",select:"-password -services -backGroundImage"},{path:"service",select:"-gallery -serviceProvider"}]});
    if (user) role = "User";


    if (!user) {
      user = await adminModel.findOne({ email }) 
        .populate({
          path: "bookings",
          populate: [
            { path: "user" },      
            { path: "provider" },  
            { path: "service" },   
          ]
        });
      if (user) role = "Admin";
    }

   
    if (!user) {
      user = await partnerModel.findOne({ email }).populate({
          path: "services",
          populate: {
            path: "gallery", 
          }
        })
        .populate({
          path: "bookings", 
          match:{isDeleteByPartner:false},
          populate: [
            { path: "user", select: "fullName email" },      
            { path: "service", select: "title description price category" } // 
          ]
        });
      if (user) role = "Partner";
    }

    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false
      });
    }

 
    user = user.toObject();
    delete user.password;
    req.session.user = user;

   
    const token = jwt.sign(
      { email: user.email, id: user._id, role },
      process.env.JWTSECRET,
      { expiresIn: "1d" }
    );

  
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: false,
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
