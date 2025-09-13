import React, { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import ViewService from './ViewService'
import axios from "../../utils/axios/axiosinstance.js"
import Loader from '../Other/Loader.jsx'
import ToastContainer from '../Other/ToastContainer.jsx'
import { useLocation } from "react-router-dom"
import ViewListingSkeleton from './ViewListingSkeleton.jsx'
import { useSelector, useDispatch } from "react-redux"
import { setListing } from '../../redux/listingSlice.js'
import { debounce } from '../../utils/helper/debounce.js'

const ServiceListing = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { listing } = useSelector((state) => state.listing);

  const [isLoading, setisLoading] = useState(false)
  const [toast, settoast] = useState({
    type: null,
    content: "",
    trigger: Date.now(),
    status: false
  })
  const [viewServiceDetil, setviewServiceDetil] = useState(null);

  const [queryObject, setqueryObject] = useState({
    category: location?.state ? [location.state] : [],
    price: [],
    rating: [],
    location: null
  });

  const filters = {
    category: ["cleaning", "plumbing", "beauty", "electrical", "repair"],
    price: [
      { label: "100 - 250", min: 100, max: 250 },
      { label: "300 - 500", min: 300, max: 500 },
      { label: "600 - 900", min: 600, max: 900 },
      { label: "above 1000", min: 1000, max: Infinity }
    ],
    rating: ["2", "3", "4"],
    location:[]
  }

  const [features, setfeatures] = useState({
    category: false,
    price: false,
    rating: false,
    location: false
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

  const updateFilters = (key) => {
    setfeatures((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // ✅ Checkbox toggle logic (for all filters)
  const handleFilterQuery = (key, value) => {
    setqueryObject((prev) => {
      if (key === "price") {
        const exists = prev.price.find(
          (p) => p.min === value.min && p.max === value.max
        );
        return {
          ...prev,
          price: exists
            ? prev.price.filter((p) => !(p.min === value.min && p.max === value.max))
            : [...prev.price, value],
        };
      }

      if (key === "rating" || key === "category") {
        return {
          ...prev,
          [key]: prev[key].includes(value)
            ? prev[key].filter((item) => item !== value)
            : [...prev[key], value],
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  // ✅ Debounced API Call
  const handleApiCall = debounce(async () => {
    const query = new URLSearchParams();

    if (queryObject.category.length > 0) {
      query.append("category", queryObject.category.join(","))
    }
    if (queryObject.price.length > 0) {
      query.append("price", JSON.stringify(queryObject.price))
    }
    if (queryObject.rating.length > 0) {
      query.append("rating", queryObject.rating.join(","))
    }
    if (queryObject.location) {
      query.append("location", queryObject.location)
    }

    try {
      setisLoading(true)
      const { data } = await axios.get(`/api/services?${query.toString()}`)
      dispatch(setListing(data?.data));
      handleSetToast("success", data?.message || "fetched ")
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
  }, 1000)

  useEffect(() => {
    handleApiCall();
  }, [queryObject])

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setisLoading(true)
          const location = await fetchLocation(latitude, longitude);
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
    );
  };

  const fetchLocation = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
    );
    const data = await response.json();
    const address = data.address || {};
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.county;
    return city || "Unknown";
  };

  const handleViewService = (service) => {
    setviewServiceDetil(service);
  }

  if (!listing) {
    return <ViewListingSkeleton />
  }

  return (
    <div className='min-h-screen w-screen bg-gray-100'>
      {viewServiceDetil && <ViewService handleViewService={handleViewService} service={viewServiceDetil} />}

      {isLoading && <Loader />}
      {toast.status && <ToastContainer trigger={toast.trigger} key={toast.trigger} type={toast.type} content={toast.content} />}

      <div className='h-full w-full flex'>
        {/* left panel */}
        <div className='flex flex-col min-h-screen md:w-1/4 gap-1 shadow-sm border-r px-5 py-3 bg-gray-50'>
          <h1 className='py-2 text-2xl font-medium'>Filters</h1>

          {Object.keys(filters).map((filterKey, i) => (
            <div key={i} className='mb-3'>
              {/* header */}
              <button
                onClick={() => updateFilters(filterKey)}
                className='w-full justify-between items-center px-3 py-2 flex bg-white rounded shadow hover:bg-gray-100'
              >
                <span className='capitalize font-medium'>{filterKey}</span>
                <span className='text-gray-600'>+</span>
              </button>

              {/* content */}
              {features[filterKey] && (
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

                  {filters[filterKey].map((item, idx) => {
                    const isChecked =
                      filterKey === "price"
                        ? queryObject.price.some(
                          (p) => p.min === item.min && p.max === item.max
                        )
                        : queryObject[filterKey].includes(item);

                    return (
                      <label key={idx} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            handleFilterQuery(
                              filterKey,
                              filterKey === "price"
                                ? { min: item.min, max: item.max }
                                : item
                            )
                          }
                          className="accent-teal-600"
                        />
                        {item.label ? item.label : item}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* right panel */}
        <div className='overflow-y-auto w-full md:w-3/4 p-6'>
          <h2 className="text-3xl font-semibold mb-3">Available Services</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {listing?.length > 0 ? listing.map((list, i) => (
              <ServiceCard
                handleViewService={handleViewService}
                category={location.state}
                service={list}
                key={list._id}
              />
            )) : <div className='h-[50vh] flex px-5 py-3  shadow-sm shadow-gray-200 justify-center items-center  w-[100vh] '> 
              <h2 className='text-4xl font-bold'>No service Available on given Filter</h2>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceListing
