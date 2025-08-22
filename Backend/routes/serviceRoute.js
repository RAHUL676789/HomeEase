const express = require("express");
const { getAll,addNewService,getServiceById,deleteServiceById,updateServiceById } = require("../controllers/serviceController");
const { asyncWrap } = require("../utils/asyncWrap");
const { isLoggedIn,isOwner } = require("../middleware");
const Router = express.Router({ mergeParams: true });




Router.route("/")
    .get(asyncWrap(getAll))
    .post(isLoggedIn,asyncWrap(addNewService));

Router.route("/:id")
    .put(isLoggedIn,isOwner,asyncWrap(updateServiceById))
    .delete(isLoggedIn,isOwner,asyncWrap(deleteServiceById))
    .get(isLoggedIn,asyncWrap(getServiceById))
    

 


    module.exports = Router;
