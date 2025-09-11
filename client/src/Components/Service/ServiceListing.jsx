import React, { useState } from 'react'
import cleaning from "../../assets/Cleaning.svg"
import ServiceCard from './ServiceCard'
import ViewService from './ViewService'
import axios from "../../utils/axios/axiosinstance.js"

const ServiceListing = () => {
  const filters = {
    category: ["cleaning", "plumber", "beautician", "electrician", "car-wash"],
    price: [{ label: "100 - 250", min: 100, max: 250 }, { label: "300 - 500", min: 300, max: 500 }, { label: "600 - 900", min: 600, max: 900 }, { label: "above 1000", min: 1000, max: Infinity }],
    rating: ["2", "3", "4"],
    location: ["jabalpur", "bhopal", "indore", "katni"]
  }
  const [features, setfeatures] = useState({
    category: false,
    price: false,
    rating: false,
    location: false
  })
  const [queryObject, setqueryObject] = useState({
    category: [],
    price: null,
    rating: null,
    location: null

  });


  const updateFilters = (key) => {
    setfeatures((prev) => {
      return {
        ...prev,
        [key]: !prev[key]
      }
    })
  }


  const handleFilterQuery = (e, key, value) => {
    setqueryObject((prev) => {
      return {
        ...prev,
        [key]: key === "category" ? [...prev[key], value] : value
      }
    })
  }


  const handleApiCal = async() => {
    console.log(queryObject)
    const query = new URLSearchParams();
    if (queryObject.category.length > 0) {
      query.append("category", queryObject.category.join(","))
    }

    if (queryObject.price) {
      query.append("price", JSON.stringify(queryObject.price))

    }

    if (queryObject.rating) {
      query.append("rating", queryObject.rating)

    }
    if (queryObject.location) {
      query.append("location", queryObject.location)

    }

    try {
      const {data} = await axios.get(`/api/services?${query.toString()}`)
      
    } catch (error) {
      console.log(error)
      
    }finally{

    }
    
  }

  return (
    <div className='min-h-screen w-screen bg-gray-100'>
      <div className='h-full w-full flex'>
        {/* left panel */}
        <div className='flex flex-col min-h-screen  md:w-1/4 gap-1 shadow-sm border-r px-5 py-3 bg-gray-50'>
          <h1 className='py-2 text-2xl font-medium'>Filters</h1>
          {

            Object.keys(filters).map((filterKey, i) => (
              <div key={i} className='mb-3'>
                {/* header */}
                <button
                  onClick={() => updateFilters(filterKey)}
                  className='w-full justify-between items-center px-3 py-2 flex  bg-white  rounded shadow hover:bg-gray-100'
                >
                  <span className='capitalize font-medium'>{filterKey}</span>
                  <span className='text-gray-600'>+</span>
                </button>
                {/* content */}
                {
                  features[filterKey] && (
                    <div className='space-y-2 mt-2 ml-2'>
                      {filters[filterKey].map((item, i) => (
                        <label key={i} className='flex items-center gap-2 text-sm'>
                          <input
                            onChange={(e) =>
                              handleFilterQuery(
                                e,
                                filterKey,
                                filterKey === "price" ? { min: item.min, max: item.max } : item
                              )
                            }

                            type={
                              filterKey === "category" ? "checkbox" : "radio"
                            }
                            name={filterKey} // har filter ka apna group
                            className="accent-teal-600"
                          />
                          {item.label ? item.label : item}
                        </label>
                      ))}
                    </div>
                  )
                }

                <button onClick={handleApiCal}>search</button>
              </div>
            ))



          }

        </div>
        {/* right panel */}
        <div className=' overflow-y-auto w-full md:w-3/4 p-6'>
          <ServiceCard category={"Beautician"} />
        </div>

      </div>



      {/* <ViewService service={{}}/> */}



    </div>
  )
}

export default ServiceListing
