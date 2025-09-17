import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const {user} = useSelector((state)=>state.user)
    console.log(user)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white rounded shadow p-6 flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.phone}</p>
        </div>
        <button className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
         <i className="ri-arrow-down-s-line"></i>
        </button>
      </div>

      {/* Bookings */}
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
        {user?.bookings?.length > 0 ? (
          <div className="space-y-3">
            {user.bookings.map((b, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 border rounded hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">{b.serviceName}</p>
                  <p className="text-sm text-gray-500">
                    Provider: {b.providerName}
                  </p>
                  <p className="text-sm text-gray-500">{b.date}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded ${
                    b.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : b.status === "Completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
