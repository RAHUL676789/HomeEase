import React, { useEffect } from 'react'

const PartnerGalleryImageView = ({ image,handleImageDelete }) => {
  console.log(image)

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden"

    return () => body.style.overflow = "auto"

  }, [])

  const btnClass = "px-4 py-1 rounded-3xl hover:bg-gray-300 cursor-pointer hover:font-semibold"
  return (
    <div className='fixed   inset-0 h-screen w-screen bg-black/20 z-50 '>
      <div className='w-[75%] overflow-scroll  flex flex-col  mx-auto rounded h-screen bg-white  '>
        <div className='flex justify-between h-16 border-b border-gray-300 items-center px-3 py-2'>
          <h2 className='text-xl font-semibold'>Image-View</h2>
          <i className='ri-close-line font-semibold cursor-pointer px-2 py-1 hover:bg-gray-200 rounded-full'></i>
        </div>
        <div className='flex-1 py-2 px-1 '>
          <img src={image?.image?.url} alt="" className='h-full w-full' />

        </div>

        <div className = " flex justify-between items-center px-4 my-3">
          <button onClick={()=>handleImageDelete(image?.serviceId,image?.image)} className={btnClass}>Delete</button>
          <button className={btnClass}>Close</button>
        </div>


      </div>

    </div>
  )
}

export default PartnerGalleryImageView
