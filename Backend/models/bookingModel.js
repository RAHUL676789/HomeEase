const mongoose = require("mongoose")


const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Partner",
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","accepted","rejected","cancelled","expired"],
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
        notes:{type:String},
        workingDate:{type:Date}
    },
    isDeleteByPartner:{type:Boolean,default:false},
    isDeleteByUser:{type:Boolean,default:false}

},{timestamps:true})


module.exports = mongoose.model("Booking",bookingSchema);