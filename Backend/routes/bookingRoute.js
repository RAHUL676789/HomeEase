const express = require("express") ;
const { isLoggedIn, validateBooking,isValidPartner } = require("../middleware");
const { newBooking, updateBooking, deleteBookingByPartner } = require("../controllers/bookingController");
const Router = express.Router({mergeParams:true});
const { asyncWrap } = require("../utils/asyncWrap");

Router.route("/")
.post(isLoggedIn,validateBooking,asyncWrap(newBooking));
Router.route("/:id")
.put(isLoggedIn,asyncWrap(isValidPartner),asyncWrap(updateBooking))
.delete(isLoggedIn,asyncWrap(isValidPartner),asyncWrap(deleteBookingByPartner))


module.exports = Router;