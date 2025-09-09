import React, { useState } from "react";
import cleaning from "../../assets/Cleaning.svg"

const ServiceListing = () => {
  const filters = {
    category: ["Cleaning", "Plumber", "Beautician", "Maintenance", "Car Wash"],
    price: [
      { label: "100 - 250", min: 100, max: 250 },
      { label: "300 - 500", min: 300, max: 500 },
      { label: "550 - 1000", min: 550, max: 1000 },
    ],
    rating: ["2+", "3+", "4+"],
    location: ["Jabalpur", "Indore", "Bhopal"],
  };

  // State to track open/close for each filter section
  const [openFilters, setOpenFilters] = useState({
    category: true,
    price: false,
    rating: false,
    location: false,
  });

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 w-screen">
      <div className="h-full w-full flex flex-col md:flex-row">
        {/* Left panel */}
        <div className="flex flex-col bg-gray-50 w-full md:w-1/4 shadow-sm border-r px-5 py-3">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Filter Sections */}
          {Object.keys(filters).map((filterKey, i) => (
            <div key={i} className="mb-4">
              {/* Header */}
              <button
                onClick={() => toggleFilter(filterKey)}
                className="w-full flex justify-between items-center bg-white px-3 py-2 rounded shadow hover:bg-gray-100"
              >
                <span className="capitalize font-medium">{filterKey}</span>
                <span className="text-gray-600">
                  {openFilters[filterKey] ? "−" : "+"}
                </span>
              </button>

              {/* Content */}
              {openFilters[filterKey] && (
                <div className="mt-2 ml-2 space-y-2">
                  {filterKey === "price"
                    ? filters[filterKey].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          name="price"
                          className="accent-teal-600"
                        />
                        {item.label}
                      </label>
                    ))
                    : filters[filterKey].map((item, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          className="accent-teal-600"
                        />
                        {item}
                      </label>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right panel */}
        <div className="overflow-y-auto w-full md:w-3/4 p-6">
          <h2 className="text-3xl font-semibold mb-3">Available Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative">
                  <img
                    src={cleaning}
                    alt="Service"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100">
                    <i className="ri-heart-line text-red-500"></i>
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-1">Home Cleaning</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    Professional home cleaning service with eco-friendly supplies and
                    trained staff.
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <i className="ri-star-line text-yellow-400 text-sm"></i>
                    <span className="text-sm text-gray-500 ml-1">(120 reviews)</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t">
                    <span className="text-teal-600 font-semibold text-lg">₹999</span>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListing;
