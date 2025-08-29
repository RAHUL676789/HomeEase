const mongoose = require("mongoose");
const cloudinary = require("../Helper/cloudinary.js")

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


gallerySchema.post("findOneAndDelete",async(docs,next)=>{

   if(docs?.details?.length > 0  ){
    for(let i = 0; i < docs.details.length ; i++){
       await cloudinary?.uploader?.destroy(docs.details[i].pId)
    }
   }
   next()
})
