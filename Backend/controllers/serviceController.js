const serviceModel = require("../models/serviceSchema.js");
// const User = required("../model/userSchema.js");
const Partner = require("../models/partnerSchema.js");
const gallerSchema = require("../models/gallerSchema.js");
const cloudinary = require("../Helper/cloudinary.js");




module.exports.getAll = async (req, res, next) => {
     const allService = await serviceModel.find();
     res.status(200).json({ message: "all service", success: true, data: allService });
}


module.exports.addNewService = async (req, res, next) => {
     const { title, description, price, duration, category, availableDays, tags, location } = req.body;
     console.log(req.body)
     const newService = new serviceModel({
          title,
          description,
          price,
          category,
          duration,
          serviceProvider: req.session.user,
          availableDays,
          tags,
          location
     });

     const currentPartner = await Partner.findById(req.session.user).populate("services");

     currentPartner?.services?.map((item, i) => {
          if (item.category === category) {
               return res.status(400).json({ message: "category already exist", success: false, data: null })
          }
     })



     const savedService = await newService.save();
     await Partner.findByIdAndUpdate(req.session.user, {
          $push: { services: savedService._id },
     });
     return res.status(200).json({ message: "service created successfully", success: true, data: savedService });
}


module.exports.getServiceById = async (req, res, next) => {
     const { id } = req.params;
     console.log(req.params)
     if (!id) {
          return res.status(401).json({ message: "service id required", success: false })
     }
     const service = await serviceModel.findById(id);

     if (!service) {
          return res.status(404).json({ message: "service not found", success: false })
     }
     return res.status(200).json({ message: "service fetched successfully ", success: true, data: service })
}


module.exports.deleteServiceById = async (req, res, next) => {
     const { id } = req.params;
     if (!id) {
          return res.status(401).json({ message: "service id required", success: false })
     }

     const deleteService = await serviceModel.findByIdAndDelete(id);

     if (!deleteService) {
          return res.status(404).json({ message: "service not found", success: false });
     }

     await User.findByIdAndUpdate(service.serviceProvider, {
          $pull: { services: service._id },
     });
     return res.status(200).json({
          message: "Service deleted successfully",
          success: true,
          data: deleteService,
     });
}


module.exports.updateServiceById = async (req, res, next) => {
     const { id } = req.params;
     console.log("this is req bodyt", req.body)
     const { title, description, price, category, gallery } = req.body;
     console.log("gallery", gallery);

     if (!id) {
          return res.status(401).json({ message: "id is requied", success: false })
     }

     let service = await serviceModel.findById(id);

     if (!service) {
          return res.status(404).json({ message: "service not found", success: false }).populate("gallery")
     }

     if (gallery && Array.isArray(gallery) && gallery.length > 0) {
          let savedServiceGallery = await gallerSchema.findOne({ serviceId: id });
          if (!savedServiceGallery) {
               savedServiceGallery = new gallerSchema({
                    serviceId: id,
                    details: []
               })

               savedServiceGallery.details.push(...gallery)
          }
          console.log("savedServiceGallery", savedServiceGallery)
          savedServiceGallery.details.push(...gallery);

          const savedGallery = await savedServiceGallery.save();

          if (!service.gallery) {
               service.gallery = []
          }

          if (!service.gallery.includes(savedServiceGallery._id)) {
               service.gallery.push(savedServiceGallery._id)
          }

          await service.save();
     }

     service = await serviceModel.findByIdAndUpdate(id, { title, description, price, category }).populate("gallery");
     return res.status(200).json({ message: "service update successfully", success: true, data: service })
}

module.exports.deleteServiceGalleryImage = async (req, res, next) => {
     const { id, galleryId } = req.params;
     const { image } = req.body;
    

   

     if (!id || !galleryId) {
          return res.status(400).json({ message: "id or imageid required", success: false })
     }

     let service = await serviceModel.findById(id).populate("gallery");

     if (!service) {
          return res.status(404).json({ message: "service not found", success: false })
     }

     let serviceGallery = await gallerSchema.findById(galleryId);

     if (!serviceGallery) {
          return res.status(404).json({ message: "service Gallery not found", success: false })
     }



     const result = await cloudinary?.uploader?.destroy(image?.pId);

     console.log(result);

     if (result?.result !== "ok") {
          return res.status(500).json({ message: result?.message || "someting went wrong while deleting image", success: false });
     }

    

      let deletedDocs = await gallerSchema.findByIdAndUpdate(galleryId,{$pull:{details:{_id:image?._id}}},{new : false});

      console.log("deletedDocs",deletedDocs)

      let deletedDoc =  deletedDocs?.details?.find(d=>d._id.toString() === image?._id);
        console.log("deletedDoc",deletedDoc)

     await serviceGallery.save();


     return res.status(200).json({ message: "image deleted", data: {service,deletedDoc}, success: true })


}