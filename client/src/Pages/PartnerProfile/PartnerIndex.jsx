import React from 'react';

const PartnerProfile = () => {
  const partner = {
    fullName: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    phone: "9876543210",
    profilePicture: "",
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    pincode: "462001",
    verified: true,
    joinDate: "Jan 2024",
    govtIdProof: "Aadhar Card",
    certifications: ["Electrical Maintenance.pdf", "AC Installation.pdf"],
    services: [
      {
        category: "Electrician",
        experience: 4,
        chargePerHour: 500,
        availableTime: "10 AM – 5 PM",
        availableDays: ["Thu", "Fri"],
        gallery: []
      },
      {
        category: "AC Repair",
        experience: 2,
        chargePerHour: 500,
        availableTime: "2 PM – 7 PM",
        availableDays: ["Mon", "Tue"],
        gallery: [
          "https://source.unsplash.com/200x150/?ac",
          "https://source.unsplash.com/200x150/?airconditioner",
          "https://source.unsplash.com/200x150/?technician"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6 md:p-8 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center text-center">
            {partner.profilePicture ? (
              <img
                src={partner.profilePicture}
                className="w-24 h-24 rounded-full border object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                <i className="ri-user-fill"></i>
              </div>
            )}
            <h2 className="text-xl font-bold mt-3">{partner.fullName}</h2>
            {partner.verified && (
              <span className="text-green-600 text-sm font-medium">✔ Verified Partner</span>
            )}
          </div>

          <div className="text-sm space-y-1">
            <p><strong>Email:</strong> {partner.email}</p>
            <p><strong>Phone:</strong> +91 {partner.phone}</p>
            <p><strong>Govt ID:</strong> {partner.govtIdProof}</p>
          </div>

          <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            ✏️ Edit Profile
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">🛠 Services Offered</h3>
              <button className="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700">
                + Add Service
              </button>
            </div>

            {/* Services Loop */}
            <div className="flex flex-col gap-5">
              {partner.services.map((service, index) => (
                <div key={index} className="border rounded-md p-4 shadow-sm bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-1">
                      <i className="ri-tools-line text-gray-500"></i>
                      {service.category}
                    </h4>
                    <span className="text-sm text-gray-500">Charges: ₹{service.chargePerHour}/hr</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
                    <p><strong>Experience:</strong> {service.experience} yrs</p>
                    <p><strong>Available Time:</strong> {service.availableTime}</p>
                    <p><strong>Available Days:</strong> {service.availableDays.join(', ')}</p>
                  </div>

                  {/* Gallery */}
                  <div className="mt-2">
                    <p className="font-medium text-sm mb-1">📸 Work Gallery</p>
                    {service.gallery.length > 0 ? (
                      <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {service.gallery.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="Gallery"
                            className="w-[120px] h-[80px] object-cover rounded-md border"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No gallery added</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2">📁 Certifications</h3>
            {partner.certifications.length ? (
              <div className="flex flex-wrap gap-3">
                {partner.certifications.map((cert, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full shadow-sm">
                    📄 {cert}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No certifications uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
