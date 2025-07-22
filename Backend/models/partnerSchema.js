const mongoose = require("mongoose");

// 👇 Reusable image schema for profile & background

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    pid: { type: String, required: true },
    edited: { type: Boolean, default: false },

    rotate: { type: Number, default: 0 },
    zoom: { type: Number, default: 100 },

    filter: {
      type: Object,
      default: {
        filterType: "",
        brightness: 0,
        contrast: 0,
        saturation: 0,
        hue: 0,
        grayscale: 0,
        sepia: 0,
      },
    },
  },
  { timestamps: true }
);

// 👇 Partner schema
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
  profilePicture: imageSchema,       // use of imageSchema
  backGroundImage: imageSchema,      // reuse of imageSchema
  govtIdProof: { type: String, default: "" },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  verified: { type: Boolean, default: false },
  documents: [String]
}, { timestamps: true });

module.exports = mongoose.model("Partner", partnerSchema);
