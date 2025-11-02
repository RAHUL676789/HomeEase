const cron = require("node-cron");
const Booking = require("../../../models/bookingModel.js")



cron.schedule("0 0 * * *",async()=>{
    try {

        const now = Date.now();
        const updatedBookings = await Booking.updateMany({createdAt:{$lt:now},status:{$in:["pending","rejected","cancelled"]}},{$set:{status:"expired"}});
        console.log("auto corn updated booking",updatedBookings)
        
    } catch (error) {
        console.log(error,"this error is hapend while auto updatiing the bookings")
    }
})