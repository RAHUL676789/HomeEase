import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "ri-home-4-line", path: "/admin/dashboard" },
    { name: "Users", icon: "ri-user-3-line", path: "/admin/users" },
    { name: "Partners", icon: "ri-team-line", path: "/admin/partners" },
    { name: "Services", icon: "ri-tools-line", path: "/admin/services" },
    { name: "Bookings", icon: "ri-calendar-check-line", path: "/admin/bookings" },
    { name: "Settings", icon: "ri-settings-3-line", path: "/admin/settings" },
  ];

  return (
    <div
      className={`h-screen bg-gray-900 text-gray-300 px-4 py-6 transition-all duration-300 shadow-lg
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo & Collapse Button */}
      <div className="flex items-center justify-between mb-10">
        <h1 className={`text-xl font-bold text-white transition-all ${isCollapsed ? "hidden" : "block"}`}>
          HomeEase Admin
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        >
          <i className="ri-menu-fold-line text-2xl"></i>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 rounded-lg transition-all cursor-pointer
              hover:bg-gray-700 hover:text-white
              ${isActive ? "bg-gray-700 text-white" : "text-gray-300"}`
            }
          >
            <i className={`${item.icon} text-xl`}></i>
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          className="w-full flex items-center gap-3 py-3 px-3 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg"
        >
          <i className="ri-logout-circle-line text-xl"></i>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}