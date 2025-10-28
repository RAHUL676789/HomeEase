const Booking = require("../models/bookingModel.js")
const User = require("../models/userModel.js")
const Partner = require("../models/partnerSchema.js")
const { socket, io } = require("../server.js")



module.exports.newBooking = async (req, res, next) => {
    const { user, provider, details, service } = req.body;

    // Create Booking
    const existingBooking = await Booking.findOne({
        user,
        provider,
        service,
        status: "pending"
    });

    if (existingBooking) {
        return res.status(409).json({
            message: "Booking already exists with pending status",
            success: false
        });
    }

    const newBooking = await Booking.create({ user, provider, details, service });

    // Ab populate karo
    await newBooking.populate("user", "fullName email");
    await newBooking.populate("provider", "-bookings -password -backGroundImage -services");
    await newBooking.populate("service","-gallery -reviews -description ")


   console.log("this is new booking connection btw user and partner",newBooking,"thankyou boooking new booking")

    //  Update User & Partner simultaneously
    const [updatedUser, updatedPartner] = await Promise.all([
        User.findByIdAndUpdate(
            user,
            { $push: { bookings: newBooking._id } },
            { new: true }
        ),
        Partner.findByIdAndUpdate(
            provider,
            { $push: { bookings: newBooking._id } },
            { new: true }
        )
    ]);

    //  Emit update to partner dashboard
    io.to(provider).emit("partner-new-booking", newBooking);

    //  Final Response
    return res.status(201).json({
        message: "Booking created successfully",
        data: newBooking,
        success: true,
    });
};


module.exports.updateBooking = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.body)
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate("user", "fullName email").populate("provider", "-bookings -password -backGroundImage -services").populate("service","-gallery -reviews -description ");
    if (!updatedBooking) {
        return res.status(404).json({ message: "booking not found", success: false })
    }

    io.to(updatedBooking?.user).emit("booking-updated", updatedBooking);

    return res.status(200).json({ message: "success updated", data: updatedBooking, success: true })
}


module.exports.deleteBookingByPartner = async (req, res, next) => {
    const { id } = req.params;
    const isBookingExist = await Booking.findById(id);
    console.log(isBookingExist)
    const partnerId = req.session?.user?._id;
    if (!isBookingExist) {
        const updatePartnerBooking = await Partner.findByIdAndUpdate(partnerId, { $pull: { bookings: id } });
        return res.status(200).json({ message: "booking already deleted from DB", data: { _id: id } })
    }

    isBookingExist.isDeleteByPartner = true;
    const savedBooking = await isBookingExist.save();
    console.log(savedBooking, "this saveddeletemosgdh")
    return res.status(200).json({ message: "booking deleted", success: true, data: savedBooking })


}