const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
 bookings:[{type:mongoose.Schema.Types.ObjectId,ref:"Booking"}],
 settings:{
  isAutoDeleteBookings:{type:Boolean,default:false}
 }
},{timestamps:true});    

module.exports = mongoose.model("User", userSchema);    
