const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Partner",
        required:true
    },
    status:{
        type:String,
        enum:["pending","cancelled","accepted","rejected"],
        default:"pending"
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
    details:{
        offerPayment:{type:Number},
        offerDuration:{type:String},
        preferdDay:{type:String},
        notes:{type:String}
    }

},{timestamps:true})


module.exports = mongoose.model("Booking",bookingSchema);