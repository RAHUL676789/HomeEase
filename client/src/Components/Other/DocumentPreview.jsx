import React, { useEffect } from 'react'

const DocumentPreview = ({ url,changePdf,apply,cancel }) => {

    useEffect(() => {

        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        return () => body.style.overflow = "auto"

    }, [])
    return (
        <div className='w-screen h-screen bg-black/20 fixed top-0 left-0 z-50 '>

            <div className='md:w-[75%] rounded-lg pb-6 mx-auto bg-white shadow-md shadow-gray-500  h-screen overflow-y-scroll '>
                <div className='flex justify-between border-b sticky top-0 left-0 border-b-gray-300 py-2 px-5 bg-white z-50'>
                    <h2 className='text-xl font-semibold'>Documet Preview</h2>
                    <i className='ri-close-line text-3xl cursor-pointer'></i>
                </div>
                <div className='h-[350px]  px-4 py-2'>
                    <iframe
                     src={url} title='pdf preview' className='h-full w-full' frameborder="0">

                    </iframe>

                </div>

                <div className='flex justify-between items-center px-5'>
                  
                    <button onClick={()=>cancel()} className=' px-5 py-1 rounded-3xl cursor-pointer hover:bg-gray-300 transition-all duration-300'>Cancel</button>
                   <div className='flex gap-4'>
                       <button onClick={()=>apply()} className='px-5 py-1 bg-blue-700 text-white font-semibold cursor-pointer rounded-3xl active:translate-y-0.5'>Apply</button>
                    <button onClick={()=>changePdf()} className='bg-gray-300 font-semibold px-5 py-1 rounded-3xl cursor-pointer'>Change Pdf</button>
                   </div>
                </div>
            </div>

        </div>
    )
}

export default DocumentPreview
