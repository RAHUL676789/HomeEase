import React from "react";
import { motion } from "framer-motion";
import ContactFooter from "./Footer";
// Using Remix Icons
// Remove lucide-react import


export default function AboutHomeEase() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-teal-600 to-blue-400 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          About HomeEase
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto opacity-90"
        >
          Making home services simple, trusted, and accessible for every household.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          At HomeEase, our mission is to create a seamless digital ecosystem where customers
          can easily access trusted home service professionals, and partners can grow their
          businesses through transparency, technology, and opportunity.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">What We Offer</h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-white shadow rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">For Customers</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Instant service booking</li>
              <li>✔ Verified and background-checked professionals</li>
              <li>✔ Transparent pricing</li>
              <li>✔ Real-time booking updates</li>
              <li>✔ Safe and secure payments</li>
            </ul>
          </div>

          <div className="p-6 bg-white shadow rounded-2xl">
            <h3 className="text-xl font-semibold mb-4">For Service Partners</h3>
            <ul className="space-y-3 text-gray-600">
              <li>✔ Business growth opportunities</li>
              <li>✔ Easy service & profile management</li>
              <li>✔ Booking dashboard</li>
              <li>✔ Payment tracking</li>
              <li>✔ Customer feedback tools</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose HomeEase?</h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <i className="ri-shield-check-line text-5xl text-blue-600 mb-4"></i>
            <h4 className="font-semibold mb-2">Trusted Professionals</h4>
            <p className="text-gray-600">Every expert is trained and verified.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <i className="ri-checkbox-circle-line text-5xl text-blue-600 mb-4"></i>
            <h4 className="font-semibold mb-2">Quality First</h4>
            <p className="text-gray-600">Strict service quality checks ensure excellence.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <i className="ri-group-line text-5xl text-blue-600 mb-4"></i>
            <h4 className="font-semibold mb-2">Fair Pricing</h4>
            <p className="text-gray-600">Transparent pricing with no hidden fees.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <i className="ri-rocket-line text-5xl text-blue-600 mb-4"></i>
            <h4 className="font-semibold mb-2">Fast Support</h4>
            <p className="text-gray-600">A responsive support team always ready to help.</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-gray-100 px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
          We aim to become India’s most trusted home services ecosystem — empowering local
          professionals, elevating service standards, and making everyday life easier for
          millions of families.
        </p>
      </section>

      {/* Footer Statement */}
      <section className="px-6 py-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Built With Care</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          HomeEase is more than an app; it is a bridge between customers who need quality
          services and professionals who deserve opportunities. Our commitment is to deliver
          reliability, transparency, and comfort through every service we offer.
        </p>
      </section>
   
    </div>
  );
}
