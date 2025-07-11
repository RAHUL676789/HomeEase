import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcg from "../../assets/bcg.png";
import pic from "../../assets/pic.jpg";

const PartnerInfo = ({ partner }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!partner) {
      navigate("/login");
    }
  }, [partner, navigate]);

  const {
    fullName = "Your Name",
    backGroundImage,
    profilePicture,
    address = {},
    verified = false,
    services = [],
    documents = [],
    phone = "Not Available",
    email = "example@domain.com",
  } = partner || {};

  const { state = "State", district = "District", country = "Country" } = address;

  return (
    <div className='w-full sm:max-w-2xl mb-14 rounded-lg bg-white sm:ml-6 shadow-md border border-gray-200 overflow-hidden'>

      {/* 🧠 Separate HEADER SECTION for bg + profile */}
      <div className="relative">
        {/* Background Image or Fallback */}
        <div className="w-full h-48 overflow-hidden">
          {backGroundImage ? (
            <img src={backGroundImage} alt="Background" className='w-full h-full object-cover' />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Welcome to the Profile</p>
            </div>
          )}
          <i className="ri-pencil-fill absolute top-3 right-4 text-white text-xl bg-black/30 rounded-full p-1 cursor-pointer hover:text-red-400 transition"></i>
        </div>

        {/* Profile Image */}
        <div className='absolute -bottom-16 left-6 z-10'>
          <div className='h-32 w-32 p-1 bg-white border rounded-full flex items-center justify-center overflow-hidden shadow-md'>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className='h-full w-full rounded-full object-cover' />
            ) : (
              <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center text-4xl font-bold text-gray-600">
                {fullName?.charAt(0).toUpperCase() || <i className="ri-user-line"></i>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🧾 MAIN BODY CONTENT (outside header) */}
      <div className='mt-20 pt-6 px-5 pb-6 sm:flex sm:flex-row flex-col justify-between relative z-0'>

        {/* Info Section */}
        <div className='mb-5'>
          <h1 className='text-2xl font-semibold text-gray-800'>{fullName}</h1>
          <p className='text-xs text-gray-500 mb-1'>{state}, {district}, {country}</p>

          <p className={`mb-1 flex items-center gap-1 ${verified ? "text-green-600" : "text-gray-400"}`}>
            <i className="ri-verified-badge-line"></i>{verified ? "Verified" : "Not Verified"}
          </p>

          {services.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <i className="ri-shield-star-line text-teal-500 text-lg"></i>
              {services.map((item, i) => (
                <span key={i} className="text-sm bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                  {item.category || "Service"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <i className="ri-shield-star-line text-teal-500"></i>No services added
            </p>
          )}

          <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
            <i className="ri-phone-fill text-green-500"></i>{phone}
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <i className="ri-mail-open-fill text-orange-400"></i>{email}
          </p>
        </div>

        {/* Uploaded Documents */}
        {documents.length > 0 ? (
          <div className="space-y-3 p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Uploaded Documents</h3>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
                  <p className="text-gray-800 font-medium">{doc.name || `Document ${index + 1}`}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                  <button className="text-green-600 hover:underline text-sm">Download</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400 mt-4">No documents uploaded</div>
        )}
      </div>
    </div>
  );
};

export default PartnerInfo;
