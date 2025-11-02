const express = require("express");
const { isLoggedIn } = require("../../middleware.js");
const { autoDeleteExpiredBooking } = require("../../controllers/node-cron/controlled/nodeCronController.js");
const Router = express.Router({mergeParams:true});

Router.route("/:id")
.put(isLoggedIn,autoDeleteExpiredBooking);



module.exports = Router;