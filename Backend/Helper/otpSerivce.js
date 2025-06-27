const redis =  require("../redis.js")


const storedOtp = async(email,otp)=>{
   try {
     await redis.set(`otp:${email}`,otp,{
        EX:300
    })
   } catch (error) {
    console.log("errot strign otp")
    throw error;
   }
}


const verifyOtp = async(email,enterOtp)=>{
 try {
     const savedOtp =   await redis.get(`otp:${email}`);
  if(savedOtp == enterOtp){
    await redis.del(`otp:${email}`);
    return true;
  }
  return false;
 } catch (error) {
    console.log("errro while verifiing otp");
    throw error;
    
 }
}


module.exports={verifyOtp,storedOtp}