const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "localhost", // or "127.0.0.1"
    port: 6379,
  },
});

redisClient.on("connect", () => console.log("🔌 Redis connected"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

redisClient.connect(); // required in redis@4+


module.exports = redisClient;
