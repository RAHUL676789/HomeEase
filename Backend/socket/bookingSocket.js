const Booking = require("../models/bookingModel.js");
const Partner = require("../models/partnerSchema.js");
const User = require("../models/userModel.js");

module.exports.bookMyService = (io, socket) => {
    socket.on("new-booking", async (data) => {
        try {
            console.log(data?.provider,"thi sis da prov")
            // DB me booking save karo
            const newBooking = new Booking({
                user: data?.user,
                provider: data?.provider,
                service: data?.service,
                details: data?.details,
            });

            const savedBooking = await newBooking.save();

            // Partner aur User me booking id push karo
            const updatedPartner = await Partner.findByIdAndUpdate(
                data?.provider,
                { $push: { bookings: savedBooking._id } },
                { new: true }
            )
                .populate({
                    path: "bookings",
                    populate: [
                        { path: "user", select: "-password" },
                        { path: "service" }
                    ]
                });


            const updatedUser = await User.findByIdAndUpdate(
                data?.user,
                { $push: { bookings: savedBooking._id } },
                { new: true }
            )
                .populate({
                    path: "bookings",
                    populate: [
                        { path: "provider", select: "-password" },
                        { path: "service" }
                    ]
                });


           // Sirf provider ko request bhejo
            io.to(data?.provider).emit("new-service-request", { message: "new service request", data: updatedPartner });

            // Sirf user ko confirmation bhejo
            io.to(data?.user).emit("service-request-send", {
                message: "Request has been sent",
                data: updatedUser
            });
        } catch (err) {
            console.error("❌ Error in booking:", err);
            socket.emit("booking-error", { error: "Booking failed" });
        }
    });
};
