const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  url: String,
  public_id: String,
  
},{timestamps:true});

module.exports = mongoose.model("Gallery", gallerySchema); // ✅ name = "Gallery"
