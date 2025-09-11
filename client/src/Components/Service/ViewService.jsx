import React, { useEffect } from "react";
import Cover1 from "../../assets/cover1.jpg";

const ViewService = ({ service, onClose }) => {
  // Fake data fallback
  const {
    title = "Premium Home Cleaning",
    description = "We provide top-notch home cleaning services with eco-friendly products and professional staff.",
    price = 499,
    location = "Jabalpur, India",
    gallery = {
      details: [
        { url: "https://source.unsplash.com/600x400/?cleaning,home" },
        { url: "https://source.unsplash.com/600x400/?house,interior" },
        { url: "https://source.unsplash.com/600x400/?vacuum,cleaning" },
      ],
    },
    review = [
      { name: "Amit Sharma", comment: "Amazing service! My home looks spotless now.", rating: 5 },
      { name: "Priya Verma", comment: "Good experience, staff was polite and professional.", rating: 4 },
    ],
  } = service || {};

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden"; // prevent background scroll
    return () => (body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal Content */}
      <div className="w-full md:w-[85%] lg:w-[75%] h-screen bg-white rounded shadow-lg flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800">Service Details</h1>
          <button onClick={onClose} className="text-2xl hover:text-red-500 transition">
            <i className="ri-close-line"></i>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Provider Info */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={Cover1} alt="provider" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-800">Rahul Lodhi</p>
                <p className="text-sm text-gray-500">Verified Provider</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Cleaning
            </span>
          </div>

          {/* Service Details */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Price:</strong> ₹{price}</p>
              <p><strong>Location:</strong> {location}</p>
              <p><strong>Available Days:</strong> Sunday, Monday, Thursday</p>
              <p><strong>Duration:</strong> Full Day</p>
              <p><strong>Discount:</strong> 10% Off</p>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            {gallery?.details?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.details.map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    alt="service"
                    className="w-full h-56 object-cover rounded-lg shadow-sm hover:scale-105 transition"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Gallery not added</p>
            )}
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
            {review?.length > 0 ? (
              <div className="space-y-4">
                {review.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow flex items-start gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.comment}</p>
                      <p className="text-yellow-500 text-sm">
                        {"⭐".repeat(item.rating)}{" "}
                        <span className="text-gray-400">({item.rating}/5)</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewService;
