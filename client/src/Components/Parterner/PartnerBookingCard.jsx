import React, { useState, useRef, useEffect } from 'react';
import cleaning from "../../assets/Cleaning.svg";
import Button from '../buttons/Button';
import PartnerBookingCancel from './PartnerBookingCancel';

const PartnerBookingCard = ({ booking, setViewBookingItem }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const cardRef = useRef(null);
  console.log(booking)
 
  const initials = booking?.user?.fullName
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2) || "NA";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setOptionsVisible(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden w-full md:max-w-sm mx-auto"
    >
    
      {/* Service Image */}
      <div className="relative">
        <img
          src={cleaning}
          alt={booking?.service?.category}
          className="w-full h-44 object-cover rounded-t-2xl"
        />
        <div className="absolute -bottom-6 left-4 h-12 w-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold border-2 border-white shadow-md">
          {initials}
        </div>
        <span className="absolute top-3 right-3 bg-yellow-400 px-3 py-1 rounded-xl text-xs font-semibold shadow">
          {booking.status}
        </span>
        <i
          className="ri-more-2-line absolute top-3 right-12 cursor-pointer text-lg text-gray-600 hover:text-gray-800"
          onClick={(e) => {
            e.stopPropagation();
            setOptionsVisible((prev) => !prev);
          }}
        ></i>

        {optionsVisible && (
          <div className="absolute top-10 right-3 w-32 bg-white border rounded-xl shadow-lg z-50">
            <ul className="flex flex-col">
              <li
                onClick={() => setViewBookingItem(booking)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-t-xl"
              >
                View More
              </li>
              <li className="px-3 py-2 cursor-pointer hover:bg-gray-100">Accept</li>
              <li className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-b-xl">Reject</li>
            </ul>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-8 px-4 pb-4 flex flex-col gap-2">
        <p className="text-gray-700 font-semibold text-lg">{booking?.service?.title}</p>
        <p className="text-gray-500 text-sm line-clamp-3">{booking?.service?.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-teal-600 font-bold text-lg">₹{booking?.service?.price}</span>
          <button
        
          className='border px-2 py-1 border-teal-500  rounded text-xs text-teal-600 cursor-pointer animate-bounce'
            onClick={() => setViewBookingItem(booking)}
          >
           <i className="ri-edit-box-line"></i> View Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerBookingCard;
