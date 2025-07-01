const redis = require("../redis.js");

// 🔐 Store OTP
const storedOtp = async (email, otp) => {
  try {
    console.log("🚀 Storing OTP in Redis", email, otp);

    const result = await redis.set(`otp:${email}`, otp, { EX: 300 });

    console.log("✅ Redis result:", result); // "OK" expected
    return result === "OK";
  } catch (error) {
    console.error("❌ Error in storedOtp:", error.message);
    return false;
  }
};

// 🔍 Verify OTP
const verifyOtp = async (email, enterOtp) => {
  try {
    console.log("🔍 Verifying OTP");

    const savedOtp = await redis.get(`otp:${email}`);
    console.log(savedOtp)
    console.log(typeof savedOtp);
    console.log(typeof enterOtp);


    if (savedOtp === enterOtp) {
      await redis.del(`otp:${email}`); // Delete after success
      return  true;
    }
    return false;
  } catch (error) {
    console.error("❌ Error verifying OTP:", error.message);
    return false;
  }
};

module.exports = { storedOtp, verifyOtp };
