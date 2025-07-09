import React from "react";

const PartnerReview = () => {
  const demoReviews = [
    {
      user: "64e32f5c94b13a001f5487c1",
      rating: 5,
      comment: "Excellent service! The plumber arrived on time and fixed everything quickly.",
      createdAt: new Date("2024-12-01T10:30:00Z")
    },
    {
      user: "64e32f5c94b13a001f5487c2",
      rating: 4,
      comment: "Good experience overall, but a bit late.",
      createdAt: new Date("2024-12-03T15:45:00Z")
    },
    {
      user: "64e32f5c94b13a001f5487c3",
      rating: 3,
      comment: "Service was okay, but not very professional.",
      createdAt: new Date("2025-01-15T12:00:00Z")
    },
    {
      user: "64e32f5c94b13a001f5487c4",
      rating: 5,
      comment: "Very professional and polite. Highly recommended!",
      createdAt: new Date("2025-03-22T09:15:00Z")
    },
    {
      user: "64e32f5c94b13a001f5487c5",
      rating: 2,
      comment: "Did not bring proper tools. Had to reschedule.",
      createdAt: new Date("2025-05-10T17:20:00Z")
    }
  ];

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`ri-star-${i < count ? "fill" : "line"} text-yellow-400 text-sm`}
      ></i>
    ));
  };

  return (
    <div className="w-full max-h-64 overflow-y-scroll no-scrollbar flex gap-4 flex-wrap px-5 py-3">
      {demoReviews.map((demo, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-lg p-4 w-64 border border-gray-200 flex flex-col justify-between"
        >
          <div className="mb-2">
            <div className="flex items-center gap-2">
              {renderStars(demo.rating)}
              <span className="text-sm text-gray-500">
                ({demo.rating}/5)
              </span>
            </div>
            <p className="text-gray-700 text-sm mt-2 line-clamp-4">{demo.comment}</p>
          </div>
          <p className="text-xs text-gray-400 text-right mt-auto">
            {new Date(demo.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PartnerReview;
