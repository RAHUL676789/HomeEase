const serviceModel = require("../models/serviceSchema.js");
// const User = required("../model/userSchema.js");
const Partner = require("../models/partnerSchema.js");
const gallerSchema = require("../models/gallerSchema.js");
const cloudinary = require("../Helper/cloudinary.js");
const { json } = require("express");




module.exports.getServiceQuery = async (req, res, next) => {
  let  {category,price,rating,location,page} = req.query;
 
  let query = {};
  if(category){
    query.category = {$in:category.split(",")}
  }
  
  if(price){
    price = JSON.parse(price);
    query.price = {};
    if(price.min !== undefined) query.price.$gt = price.min;
    if(price.max !== undefined)query.price.$lt = price.max;
  }
  if (rating) {
    rating = Number(rating);
    if(!isNaN(rating))query["reviews.rating"] = { $gte: Number(rating) };

}
 if (location) {
  query.location = { $regex: location, $options: "i" };
}

if(Object.keys(query).length === 0){
  return res.status(400).json({message:"query needed",data:null,success:false})
}

console.log(query)
 const queryData = await serviceModel.find(query).skip((page - 1) * 4).populate("gallery").populate("serviceProvider","-password").limit(4);
 

  res.status(200).json({ message: "Data Fetched SuccessFully",data:queryData,success:true });
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


  let availbleCategory = currentPartner?.services?.some(
    (service) => service.category === category
  ) || false;

  if (availbleCategory) {
    return res.status(400).json({ message: "category already exist", success: false, data: null })
  }


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
  console.log("this is service id for delete", id)
  if (!id) {
    return res.status(401).json({ message: "service id required", success: false })
  }

  const deleteService = await serviceModel.findByIdAndDelete(id);

  console.log("this is delete service", deleteService)

  if (!deleteService) {
    return res.status(404).json({ message: "service not found", success: false });
  }
  await Partner.findByIdAndUpdate(deleteService?.serviceProvider, { $pull: { services: deleteService?._id.toString() } })

  if (deleteService?.gallery) {
    let result = await gallerSchema.findByIdAndDelete(deleteService?.gallery?.toString());

    console.log(result);
  }

  return res.status(200).json({
    message: "Service deleted successfully",
    success: true,
    data: { service: deleteService },
  });
}

module.exports.updateServiceById = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, duration, gallery, discount, availableDays, location } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required", success: false });
  }

  let service = await serviceModel.findById(id);
  if (!service) {
    return res.status(404).json({ message: "service not found", success: false });
  }


  if (gallery && Array.isArray(gallery) && gallery.length > 0) {
    let savedServiceGallery = await gallerSchema.findOne({ serviceId: id });

    if (!savedServiceGallery) {

      savedServiceGallery = new gallerSchema({
        serviceId: id,
        details: [...gallery],
      });
    } else {

      savedServiceGallery.details.push(...gallery);
    }

    await savedServiceGallery.save();

    if (!service.gallery) {
      service.gallery = {};
    }

    if (!service.gallery) {
      service.gallery = savedServiceGallery._id
    }
  }


  service.title = title ?? service.title;
  service.description = description ?? service.description;
  service.price = price ?? service.price;
  service.location = location ?? service.location,
    service.availableDays = availableDays ?? service.availableDays,
    service.discount = discount ?? service.discount
  service.duration = duration ?? service.duration

  await service.save();


  const updatedService = await serviceModel.findById(service._id).populate("gallery");

  return res.status(200).json({
    message: "service updated successfully",
    success: true,
    data: updatedService,
  });
};

module.exports.deleteServiceGalleryImage = async (req, res, next) => {
  const { id, galleryId } = req.params;
  const { image } = req.body;
  console.log("image object", image);

  if (!id || !galleryId) {
    return res
      .status(400)
      .json({ message: "id or imageid required", success: false });
  }

  const service = await serviceModel.findById(id).populate("gallery");
  if (!service) {
    return res
      .status(404)
      .json({ message: "service not found", success: false });
  }

  const serviceGallery = await gallerSchema.findById(galleryId);
  if (!serviceGallery) {
    return res
      .status(404)
      .json({ message: "service Gallery not found", success: false });
  }

  // Step 1: Cloudinary deletion
  const result = await cloudinary.uploader.destroy(image?.pId, {
    invalidate: true,
  });
  console.log("cloudinary result", result);

  // Step 2: Always remove from DB
  const updatedGallery = await gallerSchema.findByIdAndUpdate(
    galleryId,
    { $pull: { details: { _id: image?._id } } },
    { new: true }
  );

  const deletedDocId = image?._id;
  if (!deletedDocId) {
    return res
      .status(404)
      .json({ message: "document not found", success: false });
  }

  // Step 3: sync service.gallery cache
  if (service?.gallery?.details) {
    service.gallery.details = service.gallery.details.filter(
      (d) => d._id.toString() !== deletedDocId.toString()
    );
  }
  await service.save();

  // Step 4: Response based on Cloudinary result
  if (result?.result === "ok") {
    return res.status(200).json({
      message: "Image deleted successfully",
      data: { service, deletedId: deletedDocId },
      success: true,
    });
  } else if (result?.result === "not found") {
    return res.status(200).json({
      message:
        "Image already missing on Cloudinary, removed from DB successfully",
      data: { service, deletedId: deletedDocId },
      success: true,
    });
  } else {
    return res.status(200).json({
      message: "Image deleted from DB (Cloudinary returned unexpected result)",
      cloudinary: result,
      data: { service, deletedId: deletedDocId },
      success: true,
    });
  }
};





