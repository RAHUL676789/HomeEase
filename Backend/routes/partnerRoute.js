const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { signup, otpSend, getPartneDtail } = require("../controllers/partnerController.js");
const { validateSignup, isLoggedIn, isEmailExist, validateLoginPartner } = require("../middleware.js");
const { login } = require("../controllers/auth/login.js");
const Router = express.Router({mergeParams:true});


Router.route("/sendOtp")
.post(asyncWrap(otpSend));

Router.route("/signup")
.post(asyncWrap(isEmailExist),validateSignup,asyncWrap(signup));



Router.route("/:id")
.get(isLoggedIn,asyncWrap(getPartneDtail))


module.exports = Router;


