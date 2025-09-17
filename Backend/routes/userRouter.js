const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { isEmailExist, validateUsersignup } = require("../middleware");
const Router = express.Router({mergeParams:true});
const {userSignup,sendOtp} = require("../controllers/userController.js");



Router.route("/sendOtp")
.post(asyncWrap(sendOtp));

Router.route("/signup")
.post(asyncWrap(isEmailExist),(validateUsersignup,asyncWrap(userSignup)));



module.exports = Router;