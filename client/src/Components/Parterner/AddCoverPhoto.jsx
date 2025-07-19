import React, { useEffect,useState } from 'react'
import cover1 from "../../assets/cover1.jpg"
import cover2 from "../../assets/cover2.jpg"
import cover3 from "../../assets/cover3.jpg"
import cover4 from "../../assets/cover4.jpg"
import cover5 from "../../assets/cover5.jpg"
import cover6 from "../../assets/cover6.jpg"
import cover7 from "../../assets/cover7.jpg"

const AddCoverPhoto = () => {

    const ImageCovers = [cover1, cover2, cover3, cover4, cover5, cover6, cover7]
    const [checkboxBg, setcheckboxBg] = useState("")

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = 'hidden'

        return () => {
            body.style.overflow = "auto"
        }

    }, [])
    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-black/10 z-50 '>

            <div className='md:w-[75%] mx-auto h-screen overflow-y-scroll bg-white shadow-md shadow-gray-500 rounded-lg pb-6'>

                <div className='flex justify-between border-b sticky top-0 left-0 border-b-gray-300 py-2 px-5 bg-white z-50'>
                    <h2 className='text-2xl font-semibold'>Add Cover Photo</h2>
                    <i className='ri-close-line text-3xl'></i>
                </div>

                <div className='px-5 '>
                    <h2 className='font-semibold text-2xl my-0.5'>Upload a photo</h2>
                    <p className='opacity-70 text-lg mb-2'>showcase your intrest work or top moments</p>
                    <button className='border rounded-3xl px-3 py-1 hover:border-2 transition-all duration-150 mb-3'>upload photo</button>
                </div>

                <div className=' px-3 border-b border-b-gray-500 pb-6 mb-4'>
                    <h2 className='text-xl font-medium mb-4'>Choose an image</h2>
                    <div className='grid grid-cols-2 gap-4 px-5'>

                        {
                            ImageCovers.map((item, i) => (
                                <div key={i} className='flex justify-center items-center gap-2 '>
                                    <label htmlFor={`cover-${i}`} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            id={`cover-${i}`}
                                            type='checkbox'
                                            className='accent-teal-600 hidden'
                                        />
                                       <div onClick={()=>setcheckboxBg(item)} className={`h-6.5 w-6.5 border rounded-full flex ${checkboxBg == item ? "bg-rose-600" :""}  justify-center items-center`}>
                                       {checkboxBg == item &&  <span className='h-3.5 flex justify-center items-center bg-white flex-col w-3.5 border rounded-full'>
                                               
                                        </span> }
                                       </div>
                                        <img src={item} alt={`cover-${i}`} className='h-32 w-72 object-cover rounded' />
                                    </label>
                                </div>
                            ))
                        }

                    </div>

                </div>


            <div className='ml-auto   flex justify-end'>
                    <button className='border bg-blue-600 px-7 py-1.5 rounded-3xl font-semibold text-white  '>Apply</button>
            </div>


            </div>

        </div>
    )
}

export default AddCoverPhoto
