import React from "react";

export default function ContactFooter() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-14 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">HomeEase</h2>
          <p className="text-gray-400 leading-relaxed">
            Your trusted platform for hassle-free home services. Book verified professionals
            anytime, anywhere.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <i className="ri-map-pin-line mr-2 text-xl text-blue-400"></i>
              Mumbai, India
            </li>
            <li>
              <i className="ri-mail-line mr-2 text-xl text-blue-400"></i>
              support@homeease.com
            </li>
            <li>
              <i className="ri-phone-line mr-2 text-xl text-blue-400"></i>
              +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Become a Partner</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HomeEase. All rights reserved.
      </div>
    </footer>
  );
}