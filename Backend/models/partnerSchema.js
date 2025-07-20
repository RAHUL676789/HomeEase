
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    district: String,
    state: String,
    country: String,
    pincode: String
  },
  profilePicture: {
    url:{
      type:String
      
    },
    pid:{
      type:String
    }
  },
  govtIdProof: {type:String , default:""},
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  verified: { type: Boolean, default: false },
  documents:[String],
  backGroundImage :{
    url:{
      type:String
    },
    pid:{
      type:String,
    }
  }
}, { timestamps: true });




module.exports = mongoose.model("Partner",partnerSchema);