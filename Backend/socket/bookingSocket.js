const Booking = require("../models/bookingModel.js");
const Partner = require("../models/partnerSchema.js");
const User = require("../models/userModel.js");

const getUpdatePartner = async (id) => {
    const updatePartner = await Partner.findById(id).populate({
        path: "services",
        populate: {
            path: "gallery"
        }
    }).populate({
        path: "bookings",
        populate: [
            {
                path: "user",
                select: "-password -bookings"
            },
            { path: "service", select: "-serviceProvider -gallery -reviews -tags" }
        ]
    });

    return updatePartner;
}


const getUpdateUser = async (id) => {

    const updateUser = await User.findById(id).populate({ path: "bookings", populate: [{ path: "provider", select: "-password -services -backGroundImage " }, { path: "service", select: "-gallery -serviceProvider" }] });
    return updateUser;

}

module.exports.bookMyService = (io, socket) => {
    socket.on("partner-new-booking", async (data) => {
        console.log("this partner new  bokign data", data)
        try {
            console.log(data?.provider, "thi sis da prov")
            // DB me booking save karo
            const newBooking = new Booking({
                user: data?.user,
                provider: data?.provider,
                service: data?.service,
                details: data?.details,
            });

            const savedBooking = await newBooking.save();

            console.log("savedBooking", savedBooking)

            // Partner aur User me booking id push karo
            const updatedPartner = await Partner.findByIdAndUpdate(
                data?.provider,
                { $push: { bookings: savedBooking._id } },
                { new: true }
            ).populate({
                path: "services",
                populate: {
                    path: "gallery"
                }
            }).populate({
                path: "bookings",
                populate: [
                    {
                        path: "user",
                        select: "-password -bookings"
                    },
                    { path: "service", select: "-serviceProvider -gallery -reviews -tags" }
                ]
            })

            const updatedUser = await User.findByIdAndUpdate(
                data?.user,
                { $push: { bookings: savedBooking._id } },
                { new: true }
            ).populate({ path: "bookings", populate: [{ path: "provider", select: "-password -services -backGroundImage " }, { path: "service", select: "-gallery -serviceProvider" }] });


            // Sirf provider ko request bhejo
            io.to(data?.provider).emit("partner-new-service-request", { message: "new service request", data: updatedPartner });

            // Sirf user ko confirmation bhejo
            io.to(data?.user).emit("user-service-request-send", {
                message: "Request has been sent",
                data: updatedUser
            });

        } catch (err) {
            console.error("❌ Error in booking:", err?.Error || err?.message);
            socket.emit("booking-error", { error: err?.message || "Booking failed" });
        }
    });


    socket.on("accept-booking", async (data) => {
        try {
            console.log(data, "this data belong to accepting booking")
            const updateBooking = await Booking.findByIdAndUpdate(data?.bookingId, { status: "accepted" }, { new: true });

            const updatedPartner = await getUpdatePartner(data?.provider)

            const updateUser = await getUpdateUser(data?.user)


            io.to(data?.provider).emit("partner-booking-confirm", { message: "booking has been confirm", data: updatedPartner });

            // Sirf user ko confirmation bhejo
            io.to(data?.user).emit("user-booking-confirm", {
                message: `${updatedPartner?.fullName} has been confirm your booking`,
                data: updateUser
            });

        } catch (error) {
           console.error("❌ Error in booking:", err?.Error || err?.message);
            socket.emit("booking-error", { error: err?.message || "Booking failed" });
        }
    })

    socket.on("reject-booking", async (data) => {
        try {
            console.log("this data is belong to reject booking", data);
            const updateBooking = await Booking.findByIdAndUpdate(data?.bookingId, { status: "rejected" }, { new: true,runValidators:true });
            const updatedPartner = await getUpdatePartner(data?.provider);
            const updatedUser = await getUpdateUser(data?.user);
            io.to(data?.provider).emit("partner-booking-reject", { message: "booking has been reject", data: updatedPartner });

            // Sirf user ko confirmation bhejo
            io.to(data?.user).emit("user-booking-reject", {
                message: `${updatedPartner?.fullName} has been reject your booking`,
                data: updatedUser
            });


        } catch (error) {
            console.error("❌ Error in booking:", err?.Error || err?.message);
            socket.emit("booking-error", { error: err?.message || "Booking failed" });
        }
    })
};
