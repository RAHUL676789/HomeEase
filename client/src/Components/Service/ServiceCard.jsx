import React, { useEffect,useState } from 'react'
import cleaning from "../../assets/Cleaning.svg"
import Beautician from "../../assets/Beauty.svg"
import CarWash from "../../assets/CarWash.svg"
import computer from "../../assets/computer.svg"
// import Electrican from "../../assets/Electrican.svg"
 
const ServiceCard = ({service,category}) => {
   const img = {
    cleaning:cleaning,
    Beautician:Beautician,
    CarWash:CarWash,
    Maintenance:computer,
  



   }

   const [defaultImage, setdefaultImage] = useState(null)
   useEffect(()=>{
    setdefaultImage(img[category])
   },[])

   
  return (
    
    <>

          <h2 className="text-3xl font-semibold mb-3">Available Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative">
                  <img
                    src={defaultImage}
                    alt="Service"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100">
                    <i className="ri-heart-line text-red-500"></i>
                  </button>
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-1">Home Cleaning</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    Professional home cleaning service with eco-friendly supplies and
                    trained staff.
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <i className="ri-star-line text-yellow-400 text-sm"></i>
                    <span className="text-sm text-gray-500 ml-1">(120 reviews)</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex justify-between items-center mt-auto pt-3 border-t">
                    <span className="text-teal-600 font-semibold text-lg">₹999</span>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

            ))}
          </div>
       
      
      </>
      
  )
}

export default ServiceCard
