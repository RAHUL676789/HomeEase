import React, { useEffect, useRef, useState, useCallback } from 'react'
import ServiceCard from './ServiceCard'
import ViewService from './ViewService'
import axios from "../../utils/axios/axiosinstance.js"
import Loader from '../Other/Loader.jsx'
import { useLocation } from "react-router-dom"
import ViewListingSkeleton from './ViewListingSkeleton.jsx'
import { useSelector, useDispatch } from "react-redux"
import { setListing } from '../../redux/listingSlice.js'
import { debounce } from '../../utils/helper/debounce.js'
import NotFound from "../../assets/NotFound.svg"
import { setToast } from '../../redux/toastSlice.js'

const ServiceListing = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { listing } = useSelector((state) => state.listing);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const rightPaneRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    type: null,
    content: "",
    trigger: Date.now(),
    status: false
  });
  const [viewServiceDetail, setViewServiceDetail] = useState(null);

  const [queryObject, setQueryObject] = useState({
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
    location: []
  }

  const [features, setFeatures] = useState({
    category: false,
    price: false,
    rating: false,
    location: false
  })


  const updateFilters = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // ✅ Checkbox toggle logic
  const handleFilterQuery = (key, value) => {
    setQueryObject((prev) => {
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

  // ✅ Helper to build query
  const buildQuery = () => {
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
    query.append("page", page);

    return query.toString();
  }

  // ✅ API Call
  const fetchServices = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/services?${buildQuery()}`);

      if (page === 1) {
        dispatch(setListing(data?.data));
      } else {
        dispatch(setListing([...listing, ...data?.data]));
      }

      if (data?.data.length < 4) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (page === 1) {
        dispatch(setToast({type:"success", content:data?.message || "Fetched services"}));
      }

    } catch (error) {
      console.log(error);
      dispatch(setToast({type:"error", content : "Something went wrong while fetching"}));
    } finally {
      setIsLoading(false);
    }
  }, [page, queryObject]);

  // ✅ Filters change → reset page
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [queryObject]);

 
  const debouncedFetch = useCallback(debounce(fetchServices, 800), [fetchServices]);

  useEffect(() => {
    if (page === 1) {
      debouncedFetch();
    } else {
      fetchServices();
    }
  }, [page, queryObject]);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setIsLoading(true)
          const location = await fetchLocation(latitude, longitude);
          handleFilterQuery("location", location)
          handleSetToast("success", "Location fetched successfully")
        } catch (err) {
          console.error("Error fetching location:", err);
          handleSetToast("error", "Location not fetched")
        } finally {
          setIsLoading(false)
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        dispatch(setToast({type:"error",content: error.message || "Location not fetched"}))
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
    setViewServiceDetail(service);
  }

  const handleScroll = () => {
    if (!rightPaneRef.current || isLoading || !hasMore) return;
    const container = rightPaneRef.current;

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
      setPage((prev) => prev + 1);
    }
  }

  if (!listing) {
    return <ViewListingSkeleton />
  }

  const handleBookNow =  (service)=>{
    try {
      
    } catch (error) {
      
    }finally{
      
    }
  }

  return (
    <div className='min-h-screen w-screen bg-gray-100'>
      {viewServiceDetail && <ViewService handleViewService={handleViewService} service={viewServiceDetail} />}

      {isLoading && page === 1 && <Loader />}
     

      <div className='h-full w-full flex'>
        {/* left panel */}
        <div className='flex flex-col min-h-screen md:w-1/4 gap-1 shadow-sm border-r px-5 py-3 bg-gray-50'>
          <h1 className='py-2 text-2xl font-medium'>Filters</h1>

          {Object.keys(filters).map((filterKey, i) => (
            <div key={i} className='mb-3'>
              <button
                onClick={() => updateFilters(filterKey)}
                className='w-full justify-between items-center px-3 py-2 flex bg-white rounded shadow hover:bg-gray-100'
              >
                <span className='capitalize font-medium'>{filterKey}</span>
                <span className='text-gray-600'>+</span>
              </button>

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
        <div ref={rightPaneRef} onScroll={handleScroll} className='overflow-y-scroll w-full md:w-3/4 p-6 max-h-screen'>
          <h2 className="text-3xl font-semibold mb-3">Available Services</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {listing?.length > 0 ? listing.map((list, i) => (
              <ServiceCard
                handleViewService={handleViewService}
                category={location.state}
                service={list}
                key={list._id}
              />
            )) : (
              <div className='col-span-2 flex flex-col px-5 py-3 shadow-sm shadow-gray-200 justify-center items-center'>
                <h2 className='text-4xl mb-3 text-gray-400'>
                  oops! no service Available on given Filter
                </h2>
                <img src={NotFound} alt="Not Found" />
              </div>
            )}
          </div>

          {/* Infinite scroll loader & end message */}
          {isLoading && page > 1 && <p className="text-center py-4">Loading more...</p>}
          {!hasMore && listing?.length > 0 && <p className="text-center py-4 text-gray-500">No more services</p>}
        </div>
      </div>
    </div>
  )
}

export default ServiceListing
