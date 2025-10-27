require("dotenv").config();

const express = require("express");
const cors = require("cors");
const {app,server,io} = require("./server.js")
const {dbConnection} = require("./config/config.js");
const serviceRouter = require("./routes/serviceRoute.js");
const partnerRouter = require("./routes/partnerRoute.js")
const authRouter = require("./routes/authRoute.js")
const userRouter = require("./routes/userRouter.js");
const homeDashRouter = require("./routes/homeRoute.js")
const bookingRouter = require("./routes/bookingRoute.js")
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { bookMyService } = require("./socket/bookingSocket.js");
dbConnection();
io.on("connection",(socket)=>{
  console.log("socket connectionon")
 
  socket.on("partner-join",(id)=>{
   console.log("this is partner id",id)
    socket.join(id)
  })

  socket.on("user-join",(id)=>{
    console.log("this is user id ",id)
    socket.join(id)
  })

  bookMyService(io,socket)


  socket.on("disconnect",()=>{
    console.log("socket connection stop")
  })
})

app.use(cors({
  origin:process.env.FRONTENDURL,
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true
}))
app.use(cookieParser());


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
app.use("/api/partner",partnerRouter);
app.use("/api/users",userRouter);
app.use("/api",homeDashRouter)
app.use("/api/bookings",bookingRouter)

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});


app.use((err,req,res,next)=>{
  console.log(err);
    const {status = 500, message = "internal server error "} = err;
    res.status(status).json({message:message,success:false});
});

server.listen(process.env.PORT,()=>{
    console.log("app is listing in the port 8080")
})