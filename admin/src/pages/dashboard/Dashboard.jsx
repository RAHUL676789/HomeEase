import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminTrialLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: "ri-dashboard-fill" },
    { label: "Users", icon: "ri-user-3-fill" },
    { label: "Partners", icon: "ri-group-fill" },
    { label: "Services", icon: "ri-tools-fill" },
    { label: "Bookings", icon: "ri-calendar-check-fill" },
    { label: "Settings", icon: "ri-settings-3-fill" },
  ];

  const stats = [
    { label: "Total Users", value: 1280, icon: "ri-user-3-fill", color: "bg-blue-600" },
    { label: "Partners", value: 240, icon: "ri-group-fill", color: "bg-green-600" },
    { label: "Bookings", value: 987, icon: "ri-calendar-check-fill", color: "bg-purple-600" },
    { label: "Revenue", value: "₹4.8L", icon: "ri-money-rupee-circle-fill", color: "bg-yellow-600" },
  ];

  return (
    <div className="flex bg-gray-950 text-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <div
        className={`$${isOpen ? "w-64" : "w-20"} bg-gray-900 border-r border-gray-800 transition-all duration-300 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-xl font-bold transition-all ${!isOpen && "opacity-0"}`}>Admin</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            <i className="ri-menu-fold-line"></i>
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 cursor-pointer"
            >
              <i className={`${item.icon} text-xl`}></i>
              {isOpen && <span className="text-sm">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-4 py-3 hover:bg-gray-800 rounded-xl cursor-pointer flex items-center gap-3">
          <i className="ri-logout-box-r-line text-xl"></i>
          {isOpen && <span>Logout</span>}
        </div>
      </div>

      {/* DASHBOARD AREA */}
      <div className="flex-1 p-6 space-y-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 relative overflow-hidden"
            >
              <div
                className={`${s.color} w-14 h-14 rounded-xl flex items-center justify-center text-3xl text-white shadow-lg`}
              >
                <i className={s.icon}></i>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 text-sm">{s.label}</p>
                <h2 className="text-3xl font-bold mt-1">{s.value}</h2>
              </div>

              <i
                className={`${s.icon} absolute right-4 bottom-4 text-6xl text-gray-700 opacity-10`}
              ></i>
            </div>
          ))}
        </div>

        {/* SIMPLE TABLE */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

          <table className="w-full text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-2">ID</th>
                <th>Service</th>
                <th>User</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-2">#101</td>
                <td>AC Repair</td>
                <td>Rahul</td>
                <td className="text-green-400">Completed</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">#102</td>
                <td>Cleaning</td>
                <td>Neha</td>
                <td className="text-yellow-400">Pending</td>
              </tr>
              <tr>
                <td className="py-2">#103</td>
                <td>Plumbing</td>
                <td>Sameer</td>
                <td className="text-red-400">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}