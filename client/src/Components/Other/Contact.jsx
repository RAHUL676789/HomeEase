import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We're here to help you with any questions, support, or feedback. Reach out to
          HomeEase and we'll get back to you as soon as possible.
        </p>

        {/* Contact Info Boxes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow rounded-2xl p-6 text-center">
            <i className="ri-map-pin-line text-4xl text-blue-600 mb-3"></i>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-600">Mumbai, Maharashtra, India</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6 text-center">
            <i className="ri-phone-line text-4xl text-blue-600 mb-3"></i>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6 text-center">
            <i className="ri-mail-line text-4xl text-blue-600 mb-3"></i>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">support@homeease.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          <form className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-medium mb-2">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium mb-2">Subject</label>
              <input
                type="text"
                placeholder="What is your message about?"
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </form>

          {/* Submit Button */}
          <div className="mt-6 text-right">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}