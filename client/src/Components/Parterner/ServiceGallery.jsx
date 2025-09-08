import React, { useEffect, useState } from 'react'

import img1 from "../../assets/cover1.jpg"
import img2 from "../../assets/cover2.jpg"
import img3 from "../../assets/cover3.jpg"
import Button from '../buttons/Button'
const ServiceGallery = ({ preview,handleRemoveFile,handleCloseGallery,handleGalleryApply }) => {
  const [currentIdx, setcurrentIdx] = useState(0)

  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";

    return () => body.style.overflow = "auto"

  }, [])

  return (
    <div className='h-screen z-50 w-screen bg-black/20 fixed top-0 left-0 '>

      <div className='w-[75%] mx-auto  flex-col rounded bg-white shadow-sm shadow-gray-900 h-screen overflow-scroll'>

        <div className='flex sticky bg-white top-0 left-0 justify-between w-full px-5 py-2 border-b border-b-gray-200 items-center'>
          <h2 className='font-semibold text-xl'>Gallery Preview</h2>
          <i onClick={()=>handleCloseGallery()} className='ri-close-line'></i>
        </div>

        <div className='h-[80%] w-full px-2  mt-4'>
          <div className='flex flex-col gap-3 '>
            <img src={preview[currentIdx]} alt=""  className='object-cover w-full'/>

            <div className='flex w-full gap-1 overflow-scroll  mb-2'>

              {
                preview?.map((item, i) => (
                 i !== currentIdx && <div className='h-32 w-48 relative flex-shrink-0'>
                    <img onClick={()=>setcurrentIdx(i)} src={preview[i]} alt="" className='h-full w-full object-cover' />

                    <i onClick={(e)=>{
                      e.stopPropagation()
                      if(currentIdx > 0){
                        setcurrentIdx((prev)=>prev - 1)
                      }
                      handleRemoveFile(i);
                    }} className='ri-close-line absolute top-0 right-0 font-semibold text-red-800 cursor-pointer text-xl'></i>

                  </div>
                ))
              }



            </div>

          </div>


          <div className='flex justify-between items-center  w-full  py-2 px-1'>
              <Button  onClick={()=>handleCloseGallery()} variant={"cancel"}>Close</Button>
            <Button onClick={()=>handleGalleryApply()} variant={"apply"}>Apply</Button>
          </div>

        </div>






      </div>
    </div>
  )
}

export default ServiceGallery
