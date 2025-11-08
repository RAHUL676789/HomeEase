const mongoose = require("mongoose")
const {Schema} = mongoose;



const reviewSchema =  new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    comment:{
        type:String,
        default:""
    }
},{timestamps:true})




module.exports = mongoose.model("Review",reviewSchema);