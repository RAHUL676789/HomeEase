const express = require("express");
const { isLoggedIn ,isValidSessionUser} = require("../../middleware.js");
const { autoDeleteExpiredBooking } = require("../../controllers/node-cron/controlled/nodeCronController.js");
const { asyncWrap } = require("../../utils/asyncWrap.js");
const Router = express.Router({mergeParams:true});

Router.route("/:id")
.put(isLoggedIn,asyncWrap(isValidSessionUser) , asyncWrap(autoDeleteExpiredBooking));



module.exports = Router;