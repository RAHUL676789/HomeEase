const mongoose = require("mongoose");
const Gallery = require("../models/gallerSchema.js")

const { Schema } = mongoose;


const serviceSchema = new Schema({
  title: { type: String, required: true, trim: true, minlength: 4 },
  description: { type: String, required: true, trim: true, minlength: 10 },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["plumbing", "electrical", "cleaning", "repair", "other"]
  },
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  availableDays: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    default: []
  },
  duration: {
    type: String,
    default: "1 hour"
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gallery"
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        trim: true,
        maxlength: 500
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });



module.exports = mongoose.model("Service", serviceSchema);
