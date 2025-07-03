const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { signup, otpSend } = require("../controllers/partnerController.js");
const { validateSignup, isLoggedIn } = require("../middleware.js");
const Router = express.Router({mergeParams:true});


Router.route("/sendOtp")
.post(asyncWrap(otpSend));
Router.route("/signup")
.post(validateSignup,asyncWrap(signup));
Router.route("/:id")
.get(isLoggedIn,asyncWrap())


module.exports = Router;


// Router.route("/login")
// .post(asyncWrap)