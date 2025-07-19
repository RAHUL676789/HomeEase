import React from 'react';
import PartnerGalleryCard from './PartnerGalleryCard';
// import PartnerReview from './PartnerReview';

const PartnerServiceCard = ({ service }) => {
  // console.log(service)
  if (!service) return null;

  const {
    title,
    description,
    price,
    category,
    location,
    availableDays,
    duration,
    discount,
    isActive,
    tags = [],
    gallery = [],
    reviews = []
  } = service;

  // console.log(service);

  return (
    <div className="rounded-lg mt-6 px-6 py-6 shadow-md shadow-gray-300 bg-white space-y-6 border border-gray-200">
      
      {/* Header: Category + Status */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Category: <span className="capitalize text-blue-600">{category}</span>
        </h2>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            isActive
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Service Info */}
      <div className="flex justify-between w-full flex-wrap gap-5">
        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium text-gray-800">Title:</span> {title}</p>
          <p><span className="font-medium text-gray-800">Description:</span> {description}</p>
          <p><span className="font-medium text-gray-800">Price:</span> ₹{price}</p>
          <p><span className="font-medium text-gray-800">Location:</span> {location}</p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium text-gray-800">Available Days:</span> {availableDays?.join(', ') || 'Not mentioned'}</p>
          <p><span className="font-medium text-gray-800">Duration:</span> {duration}</p>
          <p>
            <span className="font-medium text-gray-800">Discount:</span>{' '}
            {discount > 0 ? (
              <span className="text-green-600 font-semibold">{discount}% off</span>
            ) : (
              'No discount'
            )}
          </p>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-sm">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Gallery Section */}
      <div className="pt-2">
        <div className='flex justify-between items-center'> 
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Gallery</h2>
          <button title='add Gallery' className='border cursor-pointer px-2 rounded-full py-1'><i className="ri-add-line"></i></button>
            
        </div>
        
        {gallery.length > 0 ? (
          <PartnerGalleryCard images={gallery} />
        ) : (
          <p className="text-sm text-gray-400">No images uploaded.</p>
        )}
      </div>

      {/* Review Section */}
      <div className="pt-2">
        <h2 className="font-semibold text-lg text-gray-800 mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <PartnerReview reviews={reviews} />
        ) : (
          <p className="text-sm text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default PartnerServiceCard;
