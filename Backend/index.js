require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const {dbConnection} = require("./config/config.js");
const serviceRouter = require("./routes/serviceRoute.js");
const partnerRouter = require("./routes/partnerRoute.js")
const authRouter = require("./routes/authRoute.js")
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
dbConnection();

app.use(cors({
  origin:process.env.FRONTENDURL,
  methods:["get","post","put","patch","delete"],
  credentials:true
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const sessionOption = {
  secret: process.env.SESSION_SECRET, // ✅ use correct env variable name
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL, // ✅ this should be your MongoDB connection string
    ttl: 7 * 24 * 60 * 60, // optional: session expires in 7 days
    touchAfter: 24 * 3600, // optional: avoid resaving unchanged sessions for 24 hrs
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};

app.use(session(sessionOption))



app.use("/api/auth",authRouter);
app.use("/api/services",serviceRouter);
app.use("/api/partner",partnerRouter)

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});


app.use((err,req,res,next)=>{
  console.log(err);
    const {status = 500, message = "internal server error "} = err;
    res.status(status).json({message:message,success:false});
});

app.listen(process.env.PORT,()=>{
    console.log("app is listing in the port 8080")
})