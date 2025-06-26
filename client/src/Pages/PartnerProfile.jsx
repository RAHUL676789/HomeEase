import React from 'react';

const PartnerProfile = () => {
  // Static demo data
  const partner = {
    fullName: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    phone: "9876543210",
    profilePicture: "https://via.placeholder.com/120",
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    pincode: "462001",
    services: [
      {
        category: "Electrician",
        experience: 4,
        chargePerHour: 300,
        availableTime: "10 AM - 5 PM",
        availableDays: ["Mon", "Tue", "Wed"],
      },
      {
        category: "AC Repair",
        experience: 2,
        chargePerHour: 500,
        availableTime: "2 PM - 7 PM",
        availableDays: ["Thu", "Fri"],
      }
    ],
    govtIdProof: "Aadhar Card",
    certifications: ["Electrical Maintenance.pdf", "AC Installation.pdf"],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-6 mb-6 border-b pb-6">
        <img
          src={partner.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-700">{partner.fullName}</h2>
          <p className="text-sm text-gray-500">{partner.city}, {partner.state}, {partner.country} - {partner.pincode}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
        <div><strong>Email:</strong> {partner.email}</div>
        <div><strong>Phone:</strong> +91 {partner.phone}</div>
        <div><strong>Govt ID Proof:</strong> {partner.govtIdProof}</div>
        <div><strong>Certifications:</strong> {partner.certifications.join(", ")}</div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Offered</h3>
        <div className="grid gap-4">
          {partner.services.map((service, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h4 className="text-lg font-bold text-blue-600 mb-2">{service.category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><strong>Experience:</strong> {service.experience} years</div>
                <div><strong>Charges:</strong> ₹{service.chargePerHour}/hour</div>
                <div><strong>Available Time:</strong> {service.availableTime}</div>
                <div><strong>Available Days:</strong> {service.availableDays.join(", ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default PartnerProfile;
