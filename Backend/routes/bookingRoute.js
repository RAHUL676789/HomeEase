const express = require("express") ;
const { isLoggedIn, validateBooking,isValidPartner, isValidSessionUser, verifyUser } = require("../middleware");
const { newBooking, updateBooking, deleteBookingByPartner , deleteBookingByUser, updatesBookingByUser, updatesBookingByPartner} = require("../controllers/bookingController");
const Router = express.Router({mergeParams:true});
const { asyncWrap } = require("../utils/asyncWrap");

Router.route("/")
.post(isLoggedIn,validateBooking,asyncWrap(newBooking));

Router.route("/delete-by-partner/:id")
.patch(isLoggedIn,asyncWrap(isValidSessionUser),asyncWrap(isValidPartner),asyncWrap(deleteBookingByPartner));

Router.route("/delete-by-user/:id")
.patch(isLoggedIn,asyncWrap(isValidSessionUser),asyncWrap(verifyUser),asyncWrap(deleteBookingByUser));

// .delete(isLoggedIn,asyncWrap(isValidPartner),asyncWrap(deleteBookingByPartner));

Router.route("/user/updates/:id")
.patch(isLoggedIn,asyncWrap(isValidSessionUser) ,asyncWrap(verifyUser),asyncWrap(updatesBookingByUser));

Router.route("/partner/updates/:id")
.patch(isLoggedIn,asyncWrap(isValidSessionUser),asyncWrap(isValidPartner),asyncWrap(updatesBookingByPartner))


module.exports = Router;