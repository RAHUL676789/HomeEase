import React, { useState } from "react";

// NOTE: Make sure you have Remix Icon CSS included in your index.html or layout:
// <link href="https://cdn.remixicon.com/releases/v2.5.0/remixicon.css" rel="stylesheet">

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((s) => !s);
  const handleClose = () => setIsOpen(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Left - Logo / Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              aria-label="Toggle menu"
              className="md:hidden text-2xl p-1 hover:text-gray-300"
            >
              <i className="ri-menu-line"></i>
            </button>

            <div className="text-lg font-semibold">HomeEase Admin</div>
          </div>

          {/* Right - Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-gray-300">
              <i className="ri-notification-3-line text-xl"></i>
              <span className="text-sm">Notifications</span>
            </button>

            <div className="flex items-center gap-3">
              <img
                src="/path-to-admin-avatar.jpg"
                alt="admin"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm">Admin Name</div>
            </div>

            <button className="flex items-center gap-2 text-red-300 hover:text-red-200">
              <i className="ri-logout-circle-line text-xl"></i>
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (collapsible) */}
      <nav
        className={`md:hidden bg-gray-800 border-t border-gray-700 overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}
        aria-hidden={!isOpen}
      >
        <ul className="space-y-2 px-4">
          <li>
            <a onClick={handleClose} href="/admin/dashboard" className="block py-2">
              <i className="ri-home-4-line mr-2 align-middle"></i>
              Dashboard
            </a>
          </li>

          <li>
            <a onClick={handleClose} href="/admin/users" className="block py-2">
              <i className="ri-user-3-line mr-2 align-middle"></i>
              Users
            </a>
          </li>

          <li>
            <a onClick={handleClose} href="/admin/partners" className="block py-2">
              <i className="ri-team-line mr-2 align-middle"></i>
              Partners
            </a>
          </li>

          <li>
            <a onClick={handleClose} href="/admin/services" className="block py-2">
              <i className="ri-tools-line mr-2 align-middle"></i>
              Services
            </a>
          </li>

          <li>
            <a onClick={handleClose} href="/admin/bookings" className="block py-2">
              <i className="ri-calendar-check-line mr-2 align-middle"></i>
              Bookings
            </a>
          </li>

          <li>
            <a onClick={handleClose} href="/admin/settings" className="block py-2">
              <i className="ri-settings-3-line mr-2 align-middle"></i>
              Settings
            </a>
          </li>

          <li>
            <button
              onClick={() => {
                handleClose();
                // call your logout handler here
              }}
              className="w-full text-left py-2 text-red-300"
            >
              <i className="ri-logout-circle-line mr-2 align-middle"></i>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}