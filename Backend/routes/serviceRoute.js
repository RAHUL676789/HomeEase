const express = require("express");
const { getServiceQuery,addNewService,getServiceById,deleteServiceById,updateServiceById, deleteServiceGalleryImage ,addReview} = require("../controllers/serviceController");
const { asyncWrap } = require("../utils/asyncWrap");
const { isLoggedIn,isOwner, isValidSessionUser, validateReview } = require("../middleware");
const Router = express.Router({ mergeParams: true });




Router.route("/")
    .get(asyncWrap(getServiceQuery))
    .post(isLoggedIn,asyncWrap(addNewService));

Router.route("/:id")
    .put(isLoggedIn,isOwner,asyncWrap(updateServiceById))
    .delete(isLoggedIn,isOwner,asyncWrap(deleteServiceById))
    .get(isLoggedIn,asyncWrap(getServiceById));

 Router.route("/:id/gallery/:galleryId")  
       .delete(isLoggedIn,isOwner,asyncWrap(deleteServiceGalleryImage)) ;

  Router.route("/:id/reviews")
  .post(isLoggedIn,asyncWrap(isValidSessionUser), validateReview, asyncWrap(addReview))

    module.exports = Router;
