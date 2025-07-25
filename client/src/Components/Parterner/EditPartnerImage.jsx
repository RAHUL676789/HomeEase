import React, { useEffect, useRef, useState } from 'react'
import cover1 from "../../assets/cover1.jpg"
import { useEditableImage } from '../../Hooks/useEditableImage'

const EditPartnerImage = ({ image, picType }) => {

    const [editOptions, seteditOptions] = useState({
        crop: true,
        filter: false,
        adjust: false
    })

    const { backImage, setimage, updateFilter, reset, updateField, adjustFilterField } = useEditableImage();
    console.log("backImage",backImage)
    const [adjustOptions, setadjustOptions] = useState({
        brightness: backImage?.filter?.brightness || 0,
        contrast: backImage?.filter?.contrast || 0,
        saturation: backImage?.filter?.saturation || 0,
        grayscale: backImage?.filter?.grayscale || 0

    })

    const [currentAdjust, setcurrentAdjust] = useState("Brightness")
    const [adjustInpValue, setadjustInpValue] = useState(0);
    const adjustinpRef = useRef(null)


    const sliderRef = useRef(null);
   
    const starightRef = useRef(null)




    useEffect(() => {

        let body = document.querySelector("body");
        body.style.overflow = "hidden";
        return () => body.style.overflow = "auto"

    }, [])



    const calculateTHumbValue = (ref,value)=>{
        if(ref.current){
            const min = Number(ref.current.min);
            const max = Number(ref.current.max);
            const percent = (value -  min) / (max - min);
            return (percent * ref.current.offsetWidth) + 26;
        }
    }

   

   

   

    useEffect(() => {
        const value = backImage?.filter?.[currentAdjust.toLowerCase()] || 0;
        setadjustInpValue(value);
    }, [currentAdjust]);







    const handleEditOpetions = (key, value) => {
        // console.log(key, value)


        seteditOptions((prev) => {
            console.log(prev)
            const update = {};
            for (let k in prev) {
                update[k] = k == key ? value : false;
            }

            return update;
        })
    }

    const filters = [
        {
            filterType: "Original",
            brightness: 0,
            contrast: 0,
            saturation: 0,
            hue: 0,
            grayscale: 0,
            sepia: 0
        },
        {
            filterType: "Studio",
            brightness: 20,
            contrast: 40,
            saturation: 20,
            hue: 0,
            grayscale: 0,
            sepia: 0

        },
        {
            filterType: "Spotlight",
            brightness: 50,
            contrast: 10,
            saturation: 80,
            hue: 0,
            grayscale: 0,
            sepia: 0

        },
        {
            filterType: "Prime",
            brightness: 10,
            contrast: 80,
            saturation: 10,
            hue: 45,
            grayscale: 0,
            sepia: 0

        },
        {
            filterType: "Classic",
            brightness: -10,
            contrast: 30,
            saturation: -50,
            hue: 0,
            grayscale: 1,
            sepia: 0

        },
        {
            filterType: "Edge",
            brightness: 0,
            contrast: 50,
            saturation: -10,
            hue: -40,
            grayscale: 0,
            sepia: 1

        },
        {
            filterType: "Luminate",
            brightness: 80,
            contrast: 10,
            saturation: 100,
            hue: 10,
            grayscale: 0,
            sepia: 0

        }
    ];




    const divClass = "flex cursor-pointer justify-center items-center gap-1 py-2 "
    return (
        <div className='w-screen h-screen bg-black/20 fixed top-0 left-0 z-50'>

            <div className='md:w-[75%] rounded-lg pb-6 mx-auto bg-white shadow-md shadow-gray-500  h-screen overflow-y-scroll '>

                <div className='flex justify-between border-b sticky top-0 left-0 border-b-gray-300 py-2 px-5 bg-white z-50'>
                    <h2 className='text-2xl font-semibold'>{picType || "Edit-image"}</h2>
                    <i className='ri-close-line text-3xl cursor-pointer'></i>
                </div>

                <div className='relative w-full overflow-hidden h-[90%] bg-black'>

                    {/* Background Image */}
                    <img
                        style={{
                            filter:
                                `brightness(${100 + backImage?.filter?.brightness}%) 
                            contrast(${100 + backImage?.filter?.contrast}%) 
                            saturate(${100 + backImage?.filter?.saturation}%)
                             hue-rotate(${backImage?.filter?.hue}deg)
                             grayscale(${backImage?.filter?.grayscale}%)
                             sepia(${backImage?.filter?.sepia * 100}%)`,
                            transform: `rotate(${backImage?.rotate}deg) scale(${backImage?.zoom / 100})`
                        }}

                        src={cover1} alt='cover' className='w-full h-full object-cover ' />

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
                        <div onClick={() => handleEditOpetions("crop", true)} className={`${divClass} ${editOptions.crop ? "text-green-600" : ""}`}>
                            <i className="ri-crop-line"></i>
                            <h2 className='text-sm font-semibold'> Crop</h2>

                        </div>
                        <div onClick={() => handleEditOpetions("filter", true)} className={`${divClass} ${editOptions.filter ? "text-green-600" : ""}`}>    <i className="ri-color-filter-line"></i>
                            <h2 className='text-sm font-semibold'> Filter</h2>
                        </div>
                        <div onClick={() => handleEditOpetions("adjust", true)} className={`${divClass} ${editOptions.adjust ? "text-green-600" : ""}`}>
                            <i className="ri-equalizer-line"></i>
                            <h2 className='text-sm font-semibold'>Adjust</h2>
                        </div>
                    </div>

                    <div className='w-full'>
                        {
                            editOptions.crop ?

                                <div className={`flex    my-3 py-5 `}>
                                    <div className='flex w-[50%] flex-col justify-center items-center relative'>
                                        <h2>Zoom</h2>
                                        <p
                                            className="absolute text-xs px-2 py-1 bg-white rounded shadow"
                                            style={{
                                                top: "0px",
                                                left: `${calculateTHumbValue(sliderRef,sliderRef?.current?.value)}px`,
                                                transition: "left 0.2s ease"
                                            }}
                                        >
                                            {(backImage.zoom / 100) || 0}x
                                        </p>
                                        <div className=' w-full  flex gap-2 '>

                                            <i className="ri-subtract-line text-3xl "></i>
                                            <input ref={sliderRef} onChange={(e) =>
                                                updateField("zoom", Number(e.target.value))
                                            } type="range" className='flex-1' min={100} max={200} value={backImage.zoom} />

                                            <i className="ri-add-line text-3xl">

                                            </i>
                                        </div>
                                    </div>


                                    <div className={`flex w-[50%] flex-col justify-center items-center relative`}>
                                        <h2>Straighten</h2>

                                        <p
                                            className="absolute text-xs px-2 py-1 bg-white rounded shadow"
                                            style={{
                                                top: "0px",
                                                left: `${calculateTHumbValue(starightRef,starightRef?.current?.value)}px`,
                                                transition: "left 0.2s ease"
                                            }}
                                        >
                                            {(backImage.rotate) || 0 }&deg;
                                        </p>
                                        <div className=' flex w-full gap-2'>
                                            <i className="ri-subtract-line text-3xl"></i>
                                            <input
                                                ref={starightRef}
                                                onChange={(e) => updateField("rotate", Number(e.target.value))}
                                                value={backImage.rotate}
                                                type="range" className='flex-1' min={-180} max={180} step={5} />
                                            <i className="ri-add-line text-3xl"></i>
                                        </div>
                                    </div>
                                </div>

                                : editOptions.filter ? <div className='max-h-48 flex gap-2 mb-3 py-5'>
                                    {
                                        filters.map((item, i) => (
                                            <div key={i} onClick={() => updateFilter(item)}>
                                                <img src={cover1} alt="" style={{
                                                    filter: `
                                                         brightness(${100 + item.brightness}%)
                                                         contrast(${100 + item.contrast}%)
                                                         saturate(${100 + item.saturation}%)
                                                         hue-rotate(${item.hue}deg)
                                                         grayscale(${item.grayscale * 100}%)
                                                         sepia(${item.sepia * 100}%)
                                                                                `   }}
                                                    className={` w-20 h-20  object-cover`} />
                                                <span>{item.filterType}</span>
                                            </div>


                                        ))
                                    }

                                </div> : editOptions.adjust ? <div className='border-b border-b-gray-200 mb-2 py-2 px-5 relative'>
                                    <p
                                        style={{ left: `${calculateTHumbValue(adjustinpRef,adjustinpRef?.current?.value)}px`, top: '5px' }} className='absolute px-2 py-1 bg-white shadow rounded-sm text-sm font-light '>{(adjustinpRef?.current?.value / adjustinpRef?.current?.max) || 0} </p>

                                    <h3  className='font-medium z-50 '>{currentAdjust.charAt(0).toUpperCase() + currentAdjust.slice(1)}</h3>
                                    <div className='w-full flex justify-center items-center gap-4'>
                                        <i className="ri-subtract-line text-3xl"></i>

                                        <input ref={adjustinpRef}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setadjustInpValue(value)
                                                adjustFilterField(currentAdjust.toLowerCase(), Number(value))
                                            }}
                                            value={adjustInpValue} min={0} max={100} step={5} type="range" className='w-full' />
                                        <i className="ri-add-line text-3xl"></i>
                                    </div>

                                    <div className='  flex gap-5 py-4 '>
                                        {Object.entries(adjustOptions).map(([key, value]) => (
                                            <button  onClick={() => setcurrentAdjust(key)} className='border text-blue-500 font-semibold rounded-3xl px-3 py-1' key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</button>


                                        ))
                                        }
                                    </div>


                                </div> : null
                        }
                    </div>




                    <div className='flex justify-between '>
                      <div className='flex  gap-3'>
                          <button className='self-start px-5 py-1 hover:bg-gray-300 transition-all duration-400 rounded-3xl'>Delete Photo</button>
                         <button onClick={()=>reset()} className='self-start px-5 py-1 hover:bg-gray-300 transition-all duration-400 rounded-3xl'> Reset</button>
                      </div>
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
