import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BookingWithRating = ({booking}) => {
 

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
 

  
  const handleSubmit = async () => {
   
    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? { ...b, status: "completed", rating, review }
          : b
      )
    );
    setSelectedBooking(null);
  };

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
      

      {/* ⭐ Rating Modal */}
      <AnimatePresence>
    
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded p-8 w-[90%] max-w-md border border-white/20 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-3">
                Rate your experience
              </h2>
              <p className="text-gray-300 mb-4">
                {booking?.service?.title} by {booking?.provider?.fullName}
              </p>

           
              <div className="flex justify-center gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`ri-star-fill  duration-500 text-3xl cursor-pointer  ${
                      star <= rating
                        ? "text-orange-500 scale-110"
                        : "text-gray-800"
                    }`}
                    onClick={() => setRating(star)}
                  ></i>
                ))}
              </div>

              <textarea
                className="w-full bg-white/10 text-white placeholder-gray-400 p-3 rounded-xl border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 mb-5"
                rows={3}
                placeholder="Write a short review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    rating === 0
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
     
      </AnimatePresence>
    </div>
  );
};

export default BookingWithRating;
