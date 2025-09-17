import React, { useEffect } from "react";
import Cover1 from "../../assets/cover1.jpg";
import Button from "../buttons/Button";

const ViewService = ({ service, handleViewService }) => {
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
          <button onClick={()=>handleViewService(null)} className="text-2xl hover:text-red-500 transition">
            <i className="ri-close-line"></i>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Provider Info */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img src={ service?.serviceProvider?.profilePicture?.url || Cover1} alt="provider" className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-800">{service?.serviceProvider?.fullName || "Unknown"}</p>
                <p className="text-sm text-gray-500">Verified Provider</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              {service?.category}
            </span>
          </div>

          {/* Service Details */}
        {/* Service Details */}
<div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold mb-3">{title}</h2>
  <p className="text-gray-600 mb-4">{description}</p>
  <div className="grid grid-cols-2 gap-4 text-gray-700">
    <p><strong>Price:</strong> ₹{price}</p>
    <p><strong>Location:</strong> {location}</p>
    <p>
      <strong>Available Days:</strong>{" "}
      {service?.availableDays?.map((item, i) => (
        <span key={i} className="ml-1">{item}</span>
      ))}
    </p>
    <p><strong>Duration:</strong> {service?.duration}</p>
    <p><strong>Discount:</strong> {service?.discount ? `${service.discount}% OFF` : "No discount"}</p>
  </div>

  {/* --- User Requirement (NEW) --- */}
  <div className="mt-8 border-t pt-6">
    <h2 className="text-xl font-semibold mb-4">Your Requirement</h2>

    <form className="space-y-4">
      {/* Payment */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Payment You Offer (₹)
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Select Day */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Preferred Day
        </label>
        <select className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200">
          {service?.availableDays?.length > 0 ? (
            service.availableDays.map((day, i) => (
              <option key={i} value={day}>
                {day}
              </option>
            ))
          ) : (
            <option disabled>No days available</option>
          )}
        </select>
      </div>

      {/* Select Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Preferred Duration
        </label>
        <input
          type="text"
          placeholder="e.g. 2 hours, 3 days"
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          rows="3"
          placeholder="Describe your requirement..."
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
        />
      </div>
    </form>
  </div>
</div>


          {/* Gallery */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            {gallery?.details?.length > 0 ? (
              <div className=" overflow-scroll flex gap-5">
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
          <div className="max-h-96 overflow-scroll no-scrollbar">
            <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
            {review?.length > 0 ? (
              <div className="space-y-4">
                {review.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow flex items-start gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                      {item?.user?.fullName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item?.user?.fullName}</p>
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

        <div className="flex justify-end px-4 pt-2">
           
          <Button variant="apply" children={"Book Now"}/>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
