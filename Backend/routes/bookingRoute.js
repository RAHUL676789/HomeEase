const express = require("express") ;
const { isLoggedIn, validateBooking,isValidPartner, isValidSessionUser, verifyUser } = require("../middleware");
const { newBooking, updateBooking, deleteBookingByPartner , updateUserBooking} = require("../controllers/bookingController");
const Router = express.Router({mergeParams:true});
const { asyncWrap } = require("../utils/asyncWrap");

Router.route("/")
.post(isLoggedIn,validateBooking,asyncWrap(newBooking));
Router.route("/:id")
.put(isLoggedIn,asyncWrap(isValidPartner),asyncWrap(updateBooking))
.delete(isLoggedIn,asyncWrap(isValidPartner),asyncWrap(deleteBookingByPartner));
Router.route("/user/update/:id")
.put(isLoggedIn,asyncWrap(isValidSessionUser) ,asyncWrap(verifyUser),asyncWrap(updateUserBooking))


module.exports = Router;