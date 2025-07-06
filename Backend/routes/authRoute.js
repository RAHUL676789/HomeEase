const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { login } = require("../controllers/auth/login");
const { validateLoginPartner } = require("../middleware");

const Router = express.Router({mergeParams:true})


Router.route("/login")
.post(validateLoginPartner,asyncWrap(login))


module.exports = Router