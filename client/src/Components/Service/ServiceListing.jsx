import React, { useEffect, useState } from 'react'
import cleaning from "../../assets/Cleaning.svg"
import ServiceCard from './ServiceCard'
import ViewService from './ViewService'
import axios from "../../utils/axios/axiosinstance.js"
import Loader from '../Other/Loader.jsx'
import ToastContainer from '../Other/ToastContainer.jsx'
import { useLocation } from "react-router-dom"
import ViewListingSkeleton from './ViewListingSkeleton.jsx'
import {useSelector,useDispatch} from "react-redux"
import { setListing } from '../../redux/listingSlice.js'

const ServiceListing = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location)
  const {listing} = useSelector((state)=>state.listing);
  const [isLoading, setisLoading] = useState(false)
  const [toast, settoast] = useState({
    type: null,
    content: "",
    trigger: Date.now(),
    status: false
  })
  

  const handleSetToast = (type, content) => {
    const newToast = {
      type,
      content,
      trigger: Date.now(),
      status: true
    }
    settoast(newToast);

  }

  useEffect(()=>{
      handleApiCall();
  },[])


  const filters = {
    category: ["cleaning", "plumbing", "beauty", "electrical", "repair"],
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
    category: [location?.state],
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


  const handleFilterQuery = (key, value) => {
    setqueryObject((prev) => {
      return {
        ...prev,
        [key]: key === "category"
          ? (prev[key].includes(value)
            ? prev[key]  
            : [...prev[key], value])
          : value

      }
    })
  }


  const handleApiCall = async () => {
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
      
      const { data } = await axios.get(`/api/services?${query.toString()}`)
      console.log(data)
      dispatch(setListing(data?.data));
      handleSetToast("success", data?.message || "fetched ")
 
    } catch (error) {
      console.log(error)

    } finally {

    }

  }



  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Lat:", latitude, "Lon:", longitude);

        try {
          setisLoading(true)
          const location = await fetchLocation(latitude, longitude);
          console.log("Extracted Location:", location);
          handleFilterQuery("location", location)
          handleSetToast("success", "location fetched successfully")

        } catch (err) {
          console.error("Error fetching location:", err);
          handleSetToast("error", "location not fetched")
        } finally {
          setisLoading(false)
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        handleSetToast("error", error.message || "location not fetched")
      },
      { enableHighAccuracy: true, timeout: 10000 }
      , {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
  };

  const fetchLocation = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
    );
    const data = await response.json();
    console.log("Raw Response:", data);

    // extract city or town safely
    const address = data.address || {};
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.county;
    return city || "Unknown";
  };

  if(!listing){
    return (
      <ViewListingSkeleton/>
    )
  }

  console.log("thi is isli",listing)
  return (
    <div className='min-h-screen w-screen bg-gray-100'>

    
      {isLoading && <Loader />}
      {toast.status && <ToastContainer trigger={toast.trigger} key={toast.trigger} type={toast.type} content={toast.content} />}
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
                      {filterKey === "location" && (
                        <button
                          onClick={handleCurrentLocation}
                          className="text-blue-400 cursor-pointer px-2 py-1 rounded hover:bg-gray-200 flex items-center gap-1 text-sm w-full"
                        >
                          <i className="ri-map-pin-fill text-blue-400"></i>
                          <span>Use current location</span>
                        </button>
                      )}

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
       
        {
          listing && listing.map((list,i)=>(
            <ServiceCard service={list}/>
          ))
        }

    </div>
  )
}

export default ServiceListing
