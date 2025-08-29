import React, { useRef } from 'react'

const PartnerGalleryCard = ({ service,setViewImage }) => {
  const imgScrollRef = useRef(null);
 
  
const {gallery : images} = service;

console.log(images)

  const handleScrollLeft = (e) => {
    e.stopPropagation()
    console.log(imgScrollRef.current.scrollWidth);
    imgScrollRef.current.scrollLeft += 300;

  }

  const handleScrollRight = (e) => {
    e.stopPropagation()
    console.log(imgScrollRef.current.scrollWidth);
    imgScrollRef.current.scrollLeft -= 300;

  }
  return (
    <div className='w-full relative gap-5 mt-5 max-h-lg  min-h-lg flex overflow-scroll no-scrollbar rounded-lg'>
      <i onClick={handleScrollRight} className="ri-arrow-left-s-line text-white absolute top-1/2 text-4xl z-50 "></i>
      <div ref={imgScrollRef} className='w-full  gap-5 mt-5 min-h-lg flex overflow-scroll  overflow-x-scroll scroll-smooth transition-all duration-200 relative px-5'>

        {images?.details?.map((item, i) => (
         
            <img onDoubleClick={()=>setViewImage(service?._id,item,images?._id)} key={i} src={item?.url} className='h-64 rounded-lg object-cover' />

          
        
        ))}




      </div>

      <i onClick={handleScrollLeft} className="ri-arrow-right-s-line text-4xl text-white top-1/2 absolute right-0"></i>
    </div>
  )
}

export default PartnerGalleryCard
