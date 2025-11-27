const express = require("express");
const Router = express.Router({mergeParams:true});
const { asyncWrap } = require("../../utils/asyncWrap.js");
const { loginOtpRequest, verifyLoginOtp } = require("../../controllers/adminController/admincontroller");

Router.route("/request-otp")
.post(asyncWrap(loginOtpRequest));
Router.route("/verifyOtp")
.post(asyncWrap(verifyLoginOtp));



module.exports = Router;
