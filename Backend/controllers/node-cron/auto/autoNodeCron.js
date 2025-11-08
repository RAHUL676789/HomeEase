const cron = require("node-cron");
const Booking = require("../../../models/bookingModel.js")



cron.schedule("0 0 * * *", async () => {
    try {

        const now = Date.now();
        const updatedBookings = await Booking.updateMany(
            {
                "details.workingDate": { $lt: now }, 
                status: { $in: ["pending", "rejected", "cancelled", "accepted"] },
            },
            { $set: { status: "expired" } }
        );

    } catch (error) {
        console.log(error, "this error is hapend while auto updatiing the bookings")
    }
})