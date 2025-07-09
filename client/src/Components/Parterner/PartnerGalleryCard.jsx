import React, { useRef } from 'react'

const PartnerGalleryCard = () => {
    const imgScrollRef = useRef(null);
    const img = [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c"
    ];


    const handleScrollLeft = ()=>{
        console.log(imgScrollRef.current.scrollWidth);
        imgScrollRef.current.scrollLeft += 300;

    }

    const handleScrollRight = ()=>{
        console.log(imgScrollRef.current.scrollWidth);
        imgScrollRef.current.scrollLeft -= 300;

    }
  return (
    <div className='w-full relative gap-5 mt-5 max-h-lg flex overflow-scroll no-scrollbar rounded-lg'>
      <i onClick={handleScrollRight} className="ri-arrow-left-s-line absolute top-1/2 text-4xl text-white "></i>
       <div ref={imgScrollRef} className='w-full  gap-5 mt-5 max-h-lg flex overflow-scroll no-scrollbar overflow-x-scroll scroll-smooth transition-all duration-200'>
         {img.map((item,i)=>(
            <img key={i} src={item} className='h-64  rounded-lg object-cover'/>
        ))}

       </div>
       
      <i onClick={handleScrollLeft} className="ri-arrow-right-s-line text-4xl text-white top-1/2 absolute right-0"></i>
    </div>
  )
}

export default PartnerGalleryCard
