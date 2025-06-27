const {createclient} = require("redis");


const redis = createclient();

redis.on("error",(err)=>console.log(err));


(async()=>{
   await redis.connect();
   console.log("redis connection successfully")
})();

module.exports=redis;