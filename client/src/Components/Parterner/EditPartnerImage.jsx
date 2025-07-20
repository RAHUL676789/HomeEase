import React, { useEffect, useState } from 'react'
import cover1 from "../../assets/cover1.jpg"

const EditPartnerImage = ({ image, picType }) => {

    const [editOptions, seteditOptions] = useState({
        crop: false,
        filter: true,
        adjust: false
    })
    useEffect(() => {

        let body = document.querySelector("body");
        body.style.overflow = "hidden";
        return () => body.style.overflow = "auto"

    }, [])

    const filters = [
        { name: 'Original', class: '' },
        { name: 'Studio', class: 'contrast-125 brightness-110' },
        { name: 'Spotlight', class: 'brightness-125 saturate-150' },
        { name: 'Prime', class: 'contrast-150 hue-rotate-30' },
        { name: 'Classic', class: 'grayscale contrast-125' },
        { name: 'Edge', class: 'sepia brightness-105' },
        { name: 'Luminate', class: 'brightness-150 saturate-200' },
    ];


    const divClass = "flex justify-center items-center gap-1 py-2 "
    return (
        <div className='w-screen h-screen bg-black/20 fixed top-0 left-0 z-50'>

            <div className='md:w-[75%] rounded-lg pb-6 mx-auto bg-white shadow-md shadow-gray-500  h-screen overflow-y-scroll '>

                <div className='flex justify-between border-b sticky top-0 left-0 border-b-gray-300 py-2 px-5 bg-white z-50'>
                    <h2 className='text-2xl font-semibold'>{picType || "Edit-image"}</h2>
                    <i className='ri-close-line text-3xl cursor-pointer'></i>
                </div>

                <div className='relative w-full h-[90%] bg-black'>

                    {/* Background Image */}
                    <img src={cover1} alt='cover' className='w-full h-full object-cover ' />

                    {/* Overlay Structure */}
                    <div className='absolute inset-0'>

                        {/* Top Dark Overlay (25%) */}
                        <div className='w-full h-1/4 bg-black/50'></div>

                        {/* Middle White Overlay (50%) */}
                        <div className='w-full h-48 bg-white/30'></div>

                        {/* Bottom Dark Overlay (25%) */}
                        <div className='w-full h-1/4 bg-black/50'></div>




                    </div>
                </div>



                <div className='mt-4 px-9'>

                    <div className='flex gap-8'>
                        <div className={`${divClass} ${editOptions.crop ? "text-green-600" : ""}`}>
                            <i className="ri-crop-line"></i>
                            <h2 className='text-sm font-semibold'> Crop</h2>

                        </div>
                        <div className={`${divClass} ${editOptions.filter ? "text-green-600" : ""}`}>    <i className="ri-color-filter-line"></i>
                            <h2 className='text-sm font-semibold'> Filter</h2>
                        </div>
                        <div className={`${divClass} ${editOptions.adjust ? "text-green-600" : ""}`}>
                            <i className="ri-equalizer-line"></i>
                            <h2 className='text-sm font-semibold'>Adjust</h2>
                        </div>
                    </div>

                    <div className='w-full'>
                        {
                            editOptions.crop ?

                                <div className={`${divClass}  my-3 py-5 `}>

                                    <div className='w-[50%] flex gap-2 '>
                                        <i className="ri-subtract-line text-3xl "></i>
                                        <input type="range" className='flex-1' min={0} max={5} />
                                        <i class="ri-add-line text-3xl"></i>
                                    </div>

                                    <div className={`${divClass} w-[50%] flex gap-2`}>
                                        <i className="ri-subtract-line text-3xl"></i>
                                        <input type="range" className='flex-1' min={0} max={5} />
                                        <i class="ri-add-line text-3xl"></i>
                                    </div>
                                </div>

                                : editOptions.filter ? <div className='max-h-48 flex gap-2 mb-3 py-5'>
                                 {
                                    filters.map((item,i)=>(
                                        <div>
                                             <img src={cover1} alt="" className={`${item.class} w-20 h-20`} />
                                             <span>{item.name}</span>
                                             </div>
                                          
                                    
                                    ))
                                 }
                                    
                                </div> : editOptions.adjust ? <div> </div> : null
                        }
                    </div>




                    <div className='flex justify-between '>
                        <button className='self-start px-5 py-1 hover:bg-gray-300 transition-all duration-400 rounded'>Delete Photo</button>
                        <div className='flex gap-5'>
                            <button className='px-7 bg-blue-500 text-white font-semibold active:translate-y-0.5 py-1 rounded-3xl border'>Apply</button>
                            <button className='px-7 py-1 border rounded-3xl'>Change Photo</button>
                        </div>
                    </div>
                </div>

            </div>


        </div >
    )
}

export default EditPartnerImage
