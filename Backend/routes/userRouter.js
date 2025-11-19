const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { isEmailExist, validateUsersignup, isLoggedIn, isValidSessionUser } = require("../middleware");
const Router = express.Router({mergeParams:true});
const {userSignup,sendOtp,userUpdates} = require("../controllers/userController.js");



Router.route("/sendOtp")
.post(asyncWrap(sendOtp));

Router.route("/signup")
.post(asyncWrap(isEmailExist),(validateUsersignup,asyncWrap(userSignup)));

Router.route("/:id")
.patch(isLoggedIn,asyncWrap(isValidSessionUser),asyncWrap(userUpdates));



module.exports = Router;