
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
  profilePicture: String,
  govtIdProof: String,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  verified: { type: Boolean, default: false }
}, { timestamps: true });




module.exports = mongoose.model("Partner",partnerSchema);