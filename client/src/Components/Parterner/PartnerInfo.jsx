import React from 'react'
import bcg from "../../assets/bcg.png"
import pic from "../../assets/pic.jpg"

const PartnerInfo = ({ partner }) => {
  return (
    <div className='w-full sm:max-w-2xl mb-14  rounded-lg bg-white  sm:ml-6 shadow-sm shadow-gray-500'>
      <div className='pictures relative max-h-3/4  '>
        <div className="background w-full bg-gray-300 border rounded-t-lg h-48 ">
          <img src={bcg} alt="" className='w-full h-full rounded-t-lg  object-cover' />
        </div>
        <div className='absolute h-32 w-32 p-1 bg-white -bottom-12 left-3.5 border rounded-full '>
          <img src={pic} alt="" className=' h-full w-full rounded-full' />
        </div>
        <i className="ri-pencil-fill absolute top-3 right-12 text-xl cursor-pointer text-red-700"></i>

      </div>
      <div className='mt-16 py-5 sm:flex  sm:flex-row flex-col  px-5   w-full relative justify-between'>
        <i className="ri-pencil-fill absolute cursor-pointer -top-12 right-12"></i>
        <div className='mb-5'>
          <h1 className='text-2xl font-semibold '>Rahul Lodhi</h1>
          <span className='text-xs'>Madhayapradesh,katni,india</span>
          <p className='text-green-700'><i className="ri-verified-badge-line mr-2"></i>Verified</p>
          <p><i className="ri-shield-star-line text-teal-500 mr-2"></i>Electrician</p>
          <p><i className="ri-phone-fill text-green-500 mr-2"></i> 9243507408</p>
          <p><i className="ri-mail-open-fill text-orange-300 mr-2"></i>rahullodhi3814@gmail.com</p>
        </div>
        <div className="space-y-3 p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 max-w-md">
          <h3 className="text-xl font-semibold text-gray-800">Uploaded Documents</h3>

          {/* File 1 */}
          <div className="flex items-center justify-between p-3  bg-white rounded-lg shadow-sm border hover:shadow-md transition ">
            <div className="flex items-center gap-3">
              <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
              <p className="text-gray-800 font-medium">Mechanical.pdf</p>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline text-sm">View</button>
              <button className="text-green-600 hover:underline text-sm">Download</button>
            </div>
          </div>

          {/* File 2 */}
          <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
              <p className="text-gray-800 font-medium">Electrician.pdf</p>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:underline text-sm">View</button>
              <button className="text-green-600 hover:underline text-sm">Download</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PartnerInfo
