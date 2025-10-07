import React, { useEffect, useState } from 'react';
import cleaning from "../../assets/Cleaning.svg";
import Beautician from "../../assets/Beauty.svg";
import CarWash from "../../assets/CarWash.svg";
import computer from "../../assets/computer.svg";
import Electrician from "../../assets/Electrician.svg";

const ServiceCard = ({ service, category, handleViewService }) => {
  console.log("category")
  const img = {
    plumbing: computer,
    electrician: Electrician,
    cleaning: cleaning,
    beauty: Beautician,
    repair: CarWash
  };

  const [defaultImage, setDefaultImage] = useState(null);

  useEffect(() => {
    setDefaultImage(img[category] || img[cleaning]);
  }, [category]);

  // Calculate average rating
  const averageRating = service?.reviews?.length
    ? service.reviews.reduce((acc, cur) => acc + cur.rating, 0) / service.reviews.length
    : 0;

  const roundedRating = Math.round(averageRating);

  return (
    <div className="bg-white rounded shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col w-full">
      
      {/* Image */}
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <img
          src={service?.gallery?.details?.[0]?.url || defaultImage}
          alt={service?.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex justify-center items-center hover:bg-red-100">
          <i className="ri-heart-line text-red-500 text-lg"></i>
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg md:text-xl font-semibold mb-1 truncate">{service?.title}</h3>
        <p className="text-gray-600 text-sm md:text-base line-clamp-3 mb-2">
          {service?.description}
        </p>

        {/* Rating */}
        {service?.reviews?.length > 0 ? (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-fill text-yellow-400 text-sm md:text-base ${i < roundedRating ? "" : "text-gray-300"}`}
              ></i>
            ))}
            <span className="text-gray-500 text-sm md:text-base ml-1">
              ({service?.reviews?.length})
            </span>
          </div>
        ) : (
          <div className="text-gray-400 text-sm md:text-base mb-2">No reviews yet</div>
        )}

        {/* Price + Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-auto pt-3 border-t gap-2 sm:gap-0">
          <span className="text-teal-600 font-bold text-lg md:text-xl">₹{service?.price}</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleViewService(service)}
              className="flex-1 sm:flex-none px-3 py-1 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition text-sm md:text-base"
            >
              <i className="ri-external-link-line mr-1"></i> View
            </button>
            <button className="flex-1 sm:flex-none px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm md:text-base">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
