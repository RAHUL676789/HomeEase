const express = require("express");
const { asyncWrap } = require("../utils/asyncWrap");
const { login } = require("../controllers/auth/login");
const { validateLoginPartner } = require("../middleware");
const { getMe } = require("../controllers/auth/getMe");

const Router = express.Router({mergeParams:true})


Router.route("/login")
.post(validateLoginPartner,asyncWrap(login));
Router.route("/me")
.get(asyncWrap(getMe))


module.exports = Router