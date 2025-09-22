const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const partnerModel = require("../../models/partnerSchema");
const adminModel = require("../../models/adminSchema");

module.exports.getMe = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Token is required",
            data: null,
            success: false,
        });
    }


    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const userId = decoded.id;

    // Try all roles
    let [user, partner, admin] = await Promise.all([
        userModel.findById(userId).populate({path:"bookings",populate:[{path:"provider",select:"-password -services -backGroundImage "},{path:"service",select:"-gallery -serviceProvider"}]}),
        partnerModel.findById(userId).populate({
            path: "services",
            populate: {
                path: "gallery"
            }
        }).populate({
            path:"bookings",
            populate:[
                {path:"user",
                select:"-password -bookings"},
                {path:"service",select:"-serviceProvider -gallery -reviews -tags"}
    ]
        }),
        adminModel.findById(userId),
    ]);

    if (user) {
        user = user.toObject();
        delete user.password;
        return res.status(200).json({
            message: "User fetched successfully",
            data: user,
            role: "user",
            success: true,
        });
    }

    if (partner) {
        partner = partner.toObject();
        delete partner.password
        return res.status(200).json({
            message: "Partner fetched successfully",
            data: partner,
            role: "partner",
            success: true,
        });
    }

    if (admin) {
        admin = admin.toObject;
        delete  admin.password;
        return res.status(200).json({
            message: "Admin fetched successfully",
            data: admin,
            role: "admin",
            success: true,
        });
    }

    return res.status(404).json({
        message: "No user found with this token",
        data: null,
        success: false,
    });



};
