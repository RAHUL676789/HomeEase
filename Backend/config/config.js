const mongoose = require("mongoose");



module.exports.dbConnection = async()=>{
     try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Data base connection succefully");
     }catch(e){
       console.log(e);
     }
}