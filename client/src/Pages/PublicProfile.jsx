import React from "react";

const PartnerPublicProfile = () => {
  const partner = {
    fullName: "Ravi Sharma",
    category: "Electrician, AC Repair",
    profilePicture: "https://via.placeholder.com/120",
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    pincode: "462001",
    rating: 4.5,
    totalReviews: 38,
    phone: "9876543210",
    email: "ravi.sharma@example.com",
    about:
      "Professional electrician with over 4 years of experience in home electrical repair and AC servicing. Reliable and punctual.",
    services: [
      {
        name: "Electrician",
        experience: 4,
        price: 300,
        availableTime: "10 AM - 6 PM",
        days: ["Mon", "Tue", "Wed"],
      },
      {
        name: "AC Repair",
        experience: 2,
        price: 500,
        availableTime: "2 PM - 7 PM",
        days: ["Thu", "Fri"],
      },
    ],
    gallery: [
      { type: "image", url: "https://via.placeholder.com/150" },
      { type: "image", url: "https://via.placeholder.com/150/0000FF/FFFFFF" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
    reviews: [
      {
        name: "Amit Verma",
        rating: 5,
        comment: "Very professional and quick service. Highly recommended!",
      },
      {
        name: "Pooja Singh",
        rating: 4,
        comment: "Good experience, charges were reasonable.",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow rounded-lg space-y-8">
      {/* Top Section */}
      <div className="flex gap-6 items-center border-b pb-6">
        <img
          src={partner.profilePicture}
          alt="profile"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            {partner.fullName}
          </h2>
          <p className="text-sm text-gray-600">
            {partner.city}, {partner.state}, {partner.country} -{" "}
            {partner.pincode}
          </p>
          <p className="text-yellow-500 text-sm mt-1">
            ⭐ {partner.rating} ({partner.totalReviews} reviews)
          </p>
        </div>
      </div>

      {/* About */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-1">About</h3>
        <p className="text-sm text-gray-700">{partner.about}</p>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {partner.services.map((s, i) => (
            <div key={i} className="border rounded-lg p-4 shadow-sm">
              <h4 className="font-bold text-blue-600">{s.name}</h4>
              <p className="text-sm text-gray-600">Experience: {s.experience} yrs</p>
              <p className="text-sm text-gray-600">Charge: ₹{s.price}/hr</p>
              <p className="text-sm text-gray-600">Time: {s.availableTime}</p>
              <p className="text-sm text-gray-600">
                Days: {s.days.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Gallery</h3>
        <div className="flex flex-wrap gap-4">
          {partner.gallery.map((g, i) =>
            g.type === "image" ? (
              <img
                key={i}
                src={g.url}
                alt="gallery"
                className="w-40 h-40 object-cover rounded"
              />
            ) : (
              <video key={i} controls className="w-40 h-40 rounded">
                <source src={g.url} />
              </video>
            )
          )}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Reviews</h3>
        <div className="space-y-4">
          {partner.reviews.map((r, i) => (
            <div
              key={i}
              className="border rounded-md p-4 shadow-sm bg-gray-50"
            >
              <p className="font-semibold text-sm">{r.name}</p>
              <p className="text-yellow-500 text-sm">⭐ {r.rating}</p>
              <p className="text-sm text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerPublicProfile;
