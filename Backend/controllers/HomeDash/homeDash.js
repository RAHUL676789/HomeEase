const Bookings = require("../../models/bookingModel");
const Partner = require("../../models/partnerSchema");




module.exports.getHomeDash = async (req,res,next) => {

    const recentBookings = await Bookings.find().sort({createdAt:-1}).limit(10).populate("service").populate({
        path:"user",
        select:"-password -bookings "
    }).populate({
        path:"provider",
        select:"-password -bookings -backGroundImage -services -address -documents "
    });
    const totalPartners = await Partner.countDocuments();
    const totalBookings = await Bookings.countDocuments();
    const completedBookings = await Bookings.countDocuments({status:"accepted"});
    return res.status(200).json({message:"fetched successFully",data:{
        recentBookings,
        quickActions:[
            {label:"totalBookings",totalBookings},
            {label:"totalPartners",totalPartners},
            {label:"completedBookings",completedBookings}]
    }})
}