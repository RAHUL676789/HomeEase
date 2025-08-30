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

gallerySchema.post("findOneAndDelete",async(docs,next)=>{
      console.log("this is findOneAndDelete",docs)
   if(docs?.details?.length > 0  ){
    for(let i = 0; i < docs.details.length ; i++){
    let result =   await cloudinary?.uploader?.destroy(docs.details[i].pId);
    console.log(result);
    }
   }
   next()
})

module.exports = mongoose.model("Gallery", gallerySchema);


