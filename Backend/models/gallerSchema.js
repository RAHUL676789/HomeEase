const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  details: [
    {
      url: { type: String, required: true }, 
      pId: { type: String, required: true }  
      
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
