// config.js
require("dotenv").config()
const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log(process.env.MONGO_URL)
  try {
    const uri = process.env.MONGO_URL;  // .env me hona chahiye
    if (!uri) {
      throw new Error("❌ MONGO_URI missing in .env file");
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn; // <-- yeh important hai
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = { dbConnection };
