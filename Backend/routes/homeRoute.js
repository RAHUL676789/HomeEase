const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { getHomeDash } = require("../controllers/HomeDash/homeDash");
const Router = express.Router({mergeParams:true});




Router.route("/dash-home")
.get(asyncWrap(getHomeDash))


module.exports = Router;