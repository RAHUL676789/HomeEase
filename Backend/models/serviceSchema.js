const mongoose = require("mongoose");

const { Schema } = mongoose;


const serviceSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim:true,
        minlength:[4,"title minlength is 4"]
    },
    description: {
        type: String,
        required: [true,"description is required"],
        trim:true,
        minlength:[10,"description minlength is 10"]
    },
    image: {
        type: String,

    },
    price: {
        type: Number,
        required: [true,"price is required field"],
        min: [0,"price should be greather than 0"],

    },
    category: {
        type: String,
        required: [true,"cateogary is required"],
        lowercase:true,
        enum: ["plumbing", "electrical", "cleaning", "repair", "other"],
    },
    serviceProvider : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"serviceProvider is required"]
    }
},{timestamps:true})



module.exports = mongoose.model("Service", serviceSchema);
