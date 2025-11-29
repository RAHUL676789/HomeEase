const express = require("express");
const Router = express.Router({mergeParams:true});
const { asyncWrap } = require("../../utils/asyncWrap.js");
const { loginOtpRequest, verifyLoginOtp, getAdmin, getAdminHome } = require("../../controllers/adminController/admincontroller");
const { isValidSessionUser, isLoggedIn } = require("../../middleware.js");

Router.route("/request-otp")
.post(asyncWrap(loginOtpRequest));
Router.route("/verifyOtp")
.post(asyncWrap(verifyLoginOtp));
Router.route("/")
.get(asyncWrap(isValidSessionUser), asyncWrap(getAdmin));
Router.route("/home")
.get(asyncWrap(isValidSessionUser),isLoggedIn,asyncWrap(getAdminHome))



module.exports = Router;
