const {socket,io} = require("../server.js")






module.exports.bookCreateNewBooking = (req,res,next)=>{
    
      socket.on("partner-new-booking", async (data) => {
            console.log("this partner new  bokign data", data)
            try {
                console.log(data?.provider, "thi sis da prov")
                // DB me booking save karo
                const existingServiceBooking = await User.findById(data?.user).populate("bookings");
    
                
    
    
                console.log(existingServiceBooking);
                return;
    
                if (existingServiceBooking) {
                    console.log("User already has this service booked!");
                } else {
                    console.log("No booking exists for this service yet.");
                }
    
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
}