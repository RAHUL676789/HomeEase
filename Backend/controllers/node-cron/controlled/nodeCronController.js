const cron = require("node-cron");
const Booking = require("../../../models/bookingModel");
const User = require("../../../models/userModel");
const { io } = require("../../../server.js")

module.exports.autoDeleteExpiredBooking = async (req, res, next) => {
    const { id } = req.params;
    const { isAutoDeleted } = req.body;
    const latestUser = await User.findByIdAndUpdate(id, { $set: { "settings.isAutoDeleteBookings": isAutoDeleted } }, { new: true });

    const task = cron.schedule(
        "0 0 * * *",
        async () => {
            const expiredBookings = await Booking.find({ user: id, status: "expired" });
            if (!expiredBookings.length) return;

            const expiredIds = expiredBookings.map((b) => b._id);


            await Booking.updateMany(
                { _id: { $in: expiredIds } },
                { $set: { isDeleteByUser: true } }
            );

            await User.findByIdAndUpdate(id, { $pull: { bookings: { $in: expiredIds } } });
            
        },
        { scheduled: false }
    );

    // Toggle based on user setting
    if (isAutoDeleted) {
        task.start();
    } else {
        task.stop();
    }

    req.session.user = latestUser;

    return res.status(200).json({ message: "Auto-delete setting updated successfully", user: latestUser });

};
