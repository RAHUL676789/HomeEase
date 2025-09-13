import React, { useEffect,useState } from 'react'
import cleaning from "../../assets/Cleaning.svg"
import Beautician from "../../assets/Beauty.svg"
import CarWash from "../../assets/CarWash.svg"
import computer from "../../assets/computer.svg"
// import Electrican from "../../assets/Electrican.svg"
import Electrician from "../../assets/Electrician.svg"
 
const ServiceCard = ({service,category,handleViewService}) => {
  
   const img = {
     plumbing:computer,
     electrician:Electrician,
     cleaning:cleaning,
     beauty:Beautician,
     repair:CarWash
  
   }

   const [defaultImage, setdefaultImage] = useState(null)

   useEffect(()=>{
    setdefaultImage(img[category])
   },[category])

   const foutPlusRated = service?.reviews?.map((rev,i)=>rev.rating >= 4);

   
   
  return (
    
    <>

          {/* <h2 className="text-3xl font-semibold mb-3">Available Services</h2> */}

          <div className="">
           
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative">
                  <img
                    src={(service?.gallery?.details[0]?.url )|| defaultImage }
                    alt="Service"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute w-6 h-6   top-2 right-2 bg-white  rounded-full  shadow hover:bg-red-100">
                    <i className="ri-heart-line text-red-500"></i>
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-1">{service?.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                   {service?.description}
                  </p>

                  {/* Rating */}
                 {
                  service?.reviews?.length > 0 ? <div className="flex items-center gap-1 mt-2">
                    {foutPlusRated?.map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <i className="ri-star-line text-yellow-400 text-sm"></i>
                    <span className="text-sm text-gray-500 ml-1">({foutPlusRated.length})</span>
                  </div> : <div className='text-gray-400 text-sm'> no reviews yet </div>
                 } 

                  {/* Price + CTA */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t">
                    <span className="text-teal-600 font-semibold text-lg">₹{service?.price}</span>
                     <button onClick={()=>handleViewService(service)} className="px-4 py-1 text-teal-600  rounded-lg  cursor-pointer transition">
                       <i className="ri-external-link-line"></i> view Service
                    </button>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

         
          </div>
       
      
      </>
      
  )
}

export default ServiceCard
