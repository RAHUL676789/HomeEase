const partnerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String,
  category: String, // or services: [ { ... } ]
  address: {
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  profilePicture: String,
  govtIdProof: String,
  certifications: [String],
  experience: Number,
  chargePerHour: Number,
  availableTime: String,
  availableDays: [String],

  // ✅ NEW: Gallery
  gallery: [
    {
      type: String, // URL of image/video
      mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});
