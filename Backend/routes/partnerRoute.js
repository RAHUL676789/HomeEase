const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { signup, otpSend, getPartneDtail,updatePartner } = require("../controllers/partnerController.js");
const { validateSignup, isLoggedIn, isEmailExist, isPhoneExist } = require("../middleware.js");
const Router = express.Router({mergeParams:true});


Router.route("/sendOtp")
.post(asyncWrap(otpSend));

Router.route("/signup")
.post(asyncWrap(isEmailExist), asyncWrap(isPhoneExist),(validateSignup,asyncWrap(signup)));



Router.route("/:id")
.get(isLoggedIn,asyncWrap(getPartneDtail))
.put(isLoggedIn,asyncWrap(updatePartner))


module.exports = Router;


