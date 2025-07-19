import React from 'react'
import { useEffect } from 'react'

const PartnerCoverPhoto = () => {

    useEffect(()=>{
        const body = document.querySelector("body");
        body.style.overflow = "hidden"

        return ()=>{
            body.style.overflow = "auto"
        }

    },[])
  return (
    <div className='h-screen w-screen fixed top-0 bg-black/10 z-50 left-0'>

        <div className='h-full md:w-[75%] w-full rounded-lg mx-auto bg-white shadow-md shadow-gray-700 overflow-y-scroll '>

            <div className='sticky top-0 w-full flex border-b border-b-gray-300 justify-between px-5 py-2'>
                <h2 className='text-2xl font-semibold'>Cover Photo</h2>
                <button><i className='ri-close-line'></i></button>
            </div>

        </div>


      
    </div>
  )
}

export default PartnerCoverPhoto
