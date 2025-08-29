import React, { useEffect, useRef,useState } from 'react';
import PartnerGalleryCard from './PartnerGalleryCard';
import PartnerReview from './PartnerReview'; // ✅ Make sure this file exists

const PartnerServiceCard = ({ service,setViewImage,handleSeriveId, handleShowGalleryModal, ServiceCardOpen, handleServiceCardOpen,setDeleteableService,setEditableService }) => {
  if (!service) return null;

  const {
    _id,
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
    gallery = {},
    reviews = []
  } = service;

  const cardRef = useRef();
  const galleryRef = useRef();
  const serviceCardRef = useRef();
  const [bodyHeight, setbodyHeight] = useState(`0px`)


  useEffect(()=>{

    if(cardRef.current  && ServiceCardOpen){
      setbodyHeight(`${cardRef?.current?.scrollHeight}px`)
    }
  },[ServiceCardOpen,gallery,reviews])



  return (
    <div
      ref={serviceCardRef}
     
      className="rounded-lg mt-2 px-6 py-3 overflow-scroll no-scrollbar  bg-white border border-gray-200 space-y-4"
    >
      {/* Header: Category + Arrow */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Category: <span className="capitalize text-blue-600">{category}</span>
        </h2>
        <i onClick={()=> handleServiceCardOpen(_id)}
          style={{ rotate: ServiceCardOpen ? '180deg' : '0deg' }}
          className="ri-arrow-down-s-line px-2 cursor-pointer rounded-full py-1 hover:bg-gray-200  transition-all duration-300 text-xl"
        ></i>
      </div>

      {/* Collapsible Body */}
      <div
        ref={cardRef}
        style={{
          maxHeight:
            ServiceCardOpen && cardRef.current
              ? bodyHeight
              : '0px'
        }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        {/* Service Info */}
        <div className="flex justify-between w-full flex-wrap gap-5 text-sm text-gray-700">
          <div className="space-y-2">
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Price:</strong> ₹{price}</p>
            <p><strong>Location:</strong> {location}</p>
          </div>
          <div className="space-y-2">
            <p><strong>Available Days:</strong> {availableDays?.join(', ') || 'Not mentioned'}</p>
            <p><strong>Duration:</strong> {duration}</p>
            <p>
              <strong>Discount:</strong>{' '}
              {discount > 0 ? (
                <span className="text-green-600 font-semibold">{discount}% off</span>
              ) : (
                'No discount'
              )}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Gallery Section */}
        <div className="pt-3 overflow-scroll no-scrollbar">
          <div className="flex  justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800">Gallery</h2>
            <button onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // ✅ parent div ke click ko roka
              if (galleryRef.current) {
                galleryRef.current.click();
                handleSeriveId(service?._id || service?.id)
              }
            }} title="Add Gallery" className="border cursor-pointer px-2 rounded-full py-1">
              <i className="ri-add-line"></i>
            </button>
            <input onChange={(e)=>handleShowGalleryModal(e.target.files)} onClick={(e)=>e.stopPropagation()} ref={galleryRef} type="file" multiple className='hidden' />

          </div>
          {gallery?.details?.length > 0 ? (
            <PartnerGalleryCard service={service} setViewImage={setViewImage} />
          ) : (
            <p className="text-sm text-gray-400">No images uploaded.</p>
          )}
        </div>

        {/* Review Section */}
        <div className="pt-3">
          <h2 className="font-semibold text-lg text-gray-800">Reviews</h2>
          {reviews.length > 0 ? (
            <PartnerReview reviews={reviews} />
          ) : (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          )}
        </div>

          <div className='flex justify-between items-center w-full'>
        <button onClick={()=>setEditableService(service)} className='px-5 py-1 hover:bg-gray-300 transition-all duration-150 rounded-3xl  cursor-pointer font-semibold'>
          Edit
          </button>
          <button onClick={()=>setDeleteableService(service)} className='px-5 py-1 rounded-3xl font-semibold hover:bg-gray-500 transition-all duration-150 hover:text-white cursor-pointer'>Delete-service</button>
      </div>
      </div>


    
    </div>
  );
};

export default PartnerServiceCard;
