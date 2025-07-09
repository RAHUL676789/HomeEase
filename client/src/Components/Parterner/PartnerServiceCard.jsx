import React from 'react';
import PartnerGalleryCard from './PartnerGalleryCard';
import PartnerReview from './PartnerReview';

const PartnerServiceCard = () => {
  return (
    <div className="rounded-lg mt-4 px-6 py-6 shadow-md shadow-gray-300 bg-white space-y-5">
      {/* Category + Active */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Category: <span className='text-blue-600'>Plumbing</span></h2>
        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">Active</span>
      </div>

      {/* Service Details Row */}
      <div className="flex justify-between w-full flex-wrap gap-5">
        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium text-gray-800">Title:</span> Tap Repair Service</p>
          <p><span className="font-medium text-gray-800">Description:</span> Fix leaking taps and minor pipe issues professionally.</p>
          <p><span className="font-medium text-gray-800">Price:</span> ₹500</p>
          <p><span className="font-medium text-gray-800">Location:</span> Indore, Madhya Pradesh, India</p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium text-gray-800">Available Days:</span> Monday, Wednesday, Friday</p>
          <p><span className="font-medium text-gray-800">Duration:</span> 1 hour</p>
          <p><span className="font-medium text-gray-800">Discount:</span> <span className='text-green-600 font-semibold'>20% off</span> on first order</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">#emergency</span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">#bathroom</span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">#repair</span>
      </div>

      {/* Gallery */}
      <div className="pt-2">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">Gallery</h2>
        <PartnerGalleryCard />
      </div>

      {/* Reviews */}
      <div className="pt-2">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">Reviews</h2>
        <PartnerReview />
      </div>
    </div>
  );
};

export default PartnerServiceCard;
