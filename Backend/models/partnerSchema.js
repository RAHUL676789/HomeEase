
const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  address: {
    district: String,
    state: String,
    country: String,
    pincode: String
  },
  profilePicture: String,
  govtIdProof: String,
  services:[
    {type:mongoose.Schema.Types.ObjectId,ref:"Service"}
  ],
  gallery:[{type:mongoose.Schema.Types.ObjectId,ref:"Gallery"}]

});



module.exports = mongoose.model("Partner",partnerSchema);