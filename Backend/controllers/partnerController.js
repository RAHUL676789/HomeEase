const partnerModel = require("../models/partnerSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendOTP = require("../Helper/sendOtp.js");
const { storedOtp, verifyOtp } = require("../Helper/otpSerivce.js");
const cloudinary = require("../Helper/cloudinary.js")
const serviceModel = require("../models/serviceSchema.js");
const gallerSchema = require("../models/gallerSchema.js");





module.exports.signup = async (req, res, next) => {
  const { fullName, email, phone, password, address, otp } = req.body;
  console.log(req.body)
  // return ;
  const otpVerify = await verifyOtp(email, otp);
  if (!otpVerify) {
    return res.status(400).json({ message: "otp verification failed", success: false });
  }

  const existingUser = await partnerModel.findOne({ email: email });
  console.log(existingUser);
  if (existingUser) {
    return res.status(400).json({ message: "user email is already exist", success: false });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newPartner = new partnerModel({
    fullName,
    email,
    phone,
    password: hashPassword,
    address
  });

  let savedUser = await newPartner.save();
  const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, process.env.JWTSECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: true,
  });


  savedUser = savedUser.toObject();
  delete savedUser.password;
  req.session.user = savedUser;
  return res.status(200).json({ message: "register successfully", success: true, data: savedUser })

}






module.exports.otpSend = async (req, res, next) => {
  console.log("otpsend")
  const otp = Math.floor(1000 + Math.random() * 9000);
  const { email } = req.body;


  if (!email) {
    return res.status(404).json({ message: "email id required", success: false });
  }

  const send = await sendOTP(email, otp);
  console.log(send);
  if (!send) return res.status(500).json({ message: "someting went wrong", success: false })
  const store = await storedOtp(email, otp);
  console.log(store)
  if (!store) return res.status(500).json({ message: "someting went wrong", success: false })
  return res.status(200).json({ message: `otp sent to ${email} please verify`, success: true });


}



module.exports.getPartneDtail = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "id is required", success: false });
  }

  const partner = await partnerModel.findById(id).populate({
    path: "services",
    pupulate: {
      path: "gallery"
    }
  }).populate({
    path:"bookings",
    populate:{
      path:"user",
      select:"-password"
    }

  });

  console.log(partner)

  if (!partner) {
    return res.status(404).json({ message: "partner not found", success: false });
  }

  return res.status(200).json({ message: "fetched successfully", success: true, data: partner })
}


module.exports.updatePartner = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body)
  if (!id) {
    return res.status(400).json({ message: "id is required", success: false })
  }

  let updatedPartner;
  if (req.body.documents) {
    const newDocs = { url: req?.body?.documents?.url, pid: req?.body?.documents?.pid }
    updatedPartner = await partnerModel.findByIdAndUpdate(id, { $push: { documents: newDocs }, verified: true }, { new: true, runValidators: true }).populate({
      path: "services",
      populate: {
        path: "gallery"
      }
    });

  } else {
    updatedPartner = await partnerModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate({
      path: "services",
      populate: {
        path: "gallery"
      }
    });
  }

  if (!updatedPartner) {
    return res.status(404).json({ message: "user not found", success: false });
  }

  updatedPartner = updatedPartner.toObject();
  delete updatedPartner.password;
  res.status(200).json({ message: "profile updated successFully", success: true, data: updatedPartner });
}


module.exports.deletePartner = async (req, res, next) => {

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "partner id required", success: false });
    }

    const deletedPartner = await partnerModel.findById(id);
    if (!deletedPartner) {
      return res.status(404).json({ message: "partner not found", success: false });
    }

    // 1. Delete profile picture from cloudinary
    if (deletedPartner.profilePicture?.pid) {
      await cloudinary.uploader.destroy(deletedPartner.profilePicture.pid);
    }

    // 2. Delete background image from cloudinary
    if (deletedPartner.backGroundImage?.pid) {
      await cloudinary.uploader.destroy(deletedPartner.backGroundImage.pid);
    }

    // 3. Delete related services + galleries
    const services = await serviceModel.find({ serviceProvider: id });

    for (let service of services) {
      const galleries = await gallerSchema.find({ serviceId: service._id });

      for (let gallery of galleries) {
        for (let detail of gallery.details) {
          if (detail.pId) {
            await cloudinary.uploader.destroy(detail.pId);
          }
        }
      }

      // Delete gallery docs of this service
      await gallerSchema.deleteMany({ serviceId: service._id });
    }

    // Delete services
    await serviceModel.deleteMany({ serviceProvider: id });

    // Finally delete partner
    await partnerModel.findByIdAndDelete(id);

    req.session.destroy((err)=>{
          if(err){
            return res.status(500).json({message:"internal server error",data:null,success:false})
          }
           res.clearCookie("connect.sid"); 
             res.clearCookie("token"); 
             return res.status(200).json({ message: "Partner and related data deleted", success: true,data:null });
    });

    

  
};
