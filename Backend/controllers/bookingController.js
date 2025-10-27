const Booking = require("../models/bookingModel.js")
const User = require("../models/userModel.js")
const Partner = require("../models/partnerSchema.js")
const { socket, io } = require("../server.js")




// const isExistingBookingWithPending = (bookings, user, provider, service) => {
//     return bookings.some(b =>
//         b.user.toString() === user.toString() &&
//         b.provider.toString() === provider.toString() &&
//         b.service.toString() === service.toString() &&
//         b.status === "pending"
//     );
// };



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
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedBooking) {
        return res.status(404).json({ message: "booking not found", success: false })
    }
    
    io.to(updatedBooking?.user).emit("booking-accepted",updatedBooking);
    
    return res.status(200).json({ message: "success", data:updatedBooking,success:true})
}