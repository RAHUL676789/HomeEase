import React,{useState,useEffect} from "react";
import cleaning from "../../assets/cleaning.svg";
import PartnerServiceModal from "./PartnerServiceModal";
import { useSelector } from "react-redux";

const stats = [
  { title: "Total Bookings", value: 12, color: "from-teal-400 to-teal-200" },
  { title: "Completed", value: "₹5000", color: "from-green-400 to-green-200" },
  { title: "Pending Requests", value: 3, color: "from-yellow-300 to-yellow-500" },
];

const recentBookings = [
  { id: 1, service: "Home Cleaning", date: "2025-10-09", status: "Pending" },
  { id: 2, service: "Plumbing", date: "2025-10-08", status: "Completed" },
  { id: 3, service: "AC Repair", date: "2025-10-07", status: "Pending" },
];

const PartnerHome = () => {
   const {partner,loading} = useSelector((state)=>state.partner);

   if(loading){
    return <div className="h-screen w-screen flex flex-col justify-center items-center ">

        <p>Loading partner data ...</p>

    </div>
   }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${cleaning})` }}
    >
        {/* <PartnerServiceModal/> */}
      {/* Main overlay */}
      <div className="h-full w-full overflow-scroll no-scrollbar bg-gradient-to-tl from-gray-50/20 to-gray-100/20 flex flex-col p-8 gap-8">
        
        {/* Hero & Welcome */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl text-teal-900 font-extrabold mb-2 tracking-wide drop-shadow-lg">
              Welcome, Partner!
            </h1>
            <p className="text-lg text-teal-500 font-bold opacity-90 drop-shadow-sm">
              Manage your services and bookings efficiently.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-2">
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded shadow-lg transition transform hover:scale-105">
              Add Service
            </button>
           
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-gradient-to-r ${stat.color} rounded p-6 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300`}
            >
              <h2 className="text-3xl font-bold text-white drop-shadow">{stat.value}+</h2>
              <p className="text-white/90 text-lg">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div>
          <h3 className="text-teal-900 text-2xl font-semibold mb-4 drop-shadow">Recent Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white/85 rounded p-6 shadow-md shadow-gray-600 hover:scale-105 transition-transform duration-300 flex flex-col gap-3"
              >
                <h4 className="font-bold text-xl text-teal-900 drop-shadow">{booking.service}</h4>
                <p className="text-teal-700 font-semibold">{booking.date}</p>
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    booking.status === "Pending"
                      ? "bg-gradient-to-tl from-yellow-200 to-yellow-500 text-black"
                      : "bg-gradient-to-tr from-green-500 to-green-600 text-white"
                  }`}
                >
                  {booking.status}
                </span>
                {/* Inline action button for booking */}
                <button className="mt-3 bg-teal-500 text-white font-semibold px-4 py-2 rounded shadow hover:bg-teal-700 transition transform hover:scale-105">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnerHome;
