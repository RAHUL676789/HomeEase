const serviceModel = require("../models/serviceSchema.js");
// const User = required("../model/userSchema.js");
const Partner = require("../models/partnerSchema.js")



module.exports.getAll = async (req, res, next) => {
     const allService = await serviceModel.find();
     res.status(200).json({ message: "all service", success: true, data: allService });
}


module.exports.addNewService = async (req, res, next) => {
     const { title, description, price, duration, category,availableDays,tags,location } = req.body;
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

     const savedService = await newService.save();
     await Partner.findByIdAndUpdate(req.session.user, {
          $push: { services: savedService._id },
     });
     return res.status(200).json({ message: "service created successfully", success: true, data: savedService });
}


module.exports.getServiceById = async (req, res, next) => {
     const { id } = req.params;
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


     const { title, description, price, category, image } = req.body;

     if (!id) {
          return res.status(401).json({ message: "id is required", success: false });
     }

     const updatedService = await serviceModel.findByIdAndUpdate(id, { title, description, price, image, category }, { new: true ,runValidators:true});

     return res.status(200).json({ message: "service updated successfully", success: true })



}