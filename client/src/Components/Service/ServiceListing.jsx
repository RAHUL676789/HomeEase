import React, { useEffect, useRef, useState, useCallback } from 'react';
import ServiceCard from './ServiceCard';
import ViewService from './ViewService';
import axios from "../../utils/axios/axiosinstance.js";
import Loader from '../Other/Loader.jsx';
import { useLocation } from "react-router-dom";
import ViewListingSkeleton from './ViewListingSkeleton.jsx';
import { useSelector, useDispatch } from "react-redux";
import { setListing } from '../../redux/listingSlice.js';
import { debounce } from '../../utils/helper/debounce.js';
import NotFound from "../../assets/NotFound.svg";
import { setToast } from '../../redux/toastSlice.js';

const ServiceListing = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { listing } = useSelector((state) => state.listing);
  const toastShown = useRef(false)

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const rightPaneRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewServiceDetail, setViewServiceDetail] = useState(null);

  const [queryObject, setQueryObject] = useState({
    category: [],
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
  };

  // Track which filters are expanded
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: false,
    rating: false,
    location: false
  });

  const toggleFilter = (key) => {
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle filter selection
 const handleFilterQuery = (key, value) => {
  setQueryObject(prev => {
    if (key === "price") {
      // radio -> single value only
      return {
        ...prev,
        price: prev.price.some(p => p.min === value.min && p.max === value.max)
          ? [] // deselect if clicked again
          : [value]
      };
    }

    if (key === "rating") {
      // radio -> single value only
      return {
        ...prev,
        rating: prev.rating.includes(value) ? [] : [value]
      };
    }

    if (key === "category") {
      // checkbox -> multi select
      return {
        ...prev,
        category: prev.category.includes(value)
          ? prev.category.filter(item => item !== value)
          : [...prev.category, value]
      };
    }

    return { ...prev, [key]: value };
  });
};


  // Build query for API call
  const buildQuery = () => {
    const query = new URLSearchParams();
    if (queryObject.category.length) query.append("category", queryObject.category.join(","));
    if (queryObject.price.length) query.append("price", JSON.stringify(queryObject.price));
    if (queryObject.rating.length) query.append("rating", queryObject.rating.join(","));
    if (queryObject.location) query.append("location", queryObject.location);
    query.append("page", page);
    return query.toString();
  };

  const isQueryEmpty = (query) => {
    return (
      (!query.category || query.category.length === 0) &&
      (!query.price || query.price.length === 0) &&
      (!query.rating || query.rating.length === 0) &&
      (!query.location || query.location === null)
    );
  };

  // Fetch services from backend
  const fetchServices = useCallback(async () => {
    try {

      setIsLoading(true);


      const { data } = await axios.get(`/api/services?${buildQuery()}`);
      if (page === 1) dispatch(setListing(data?.data));
      else dispatch(setListing([...listing, ...data?.data]));
      setHasMore(data?.data.length >= 4);
      if (page === 1 && !toastShown.current) {
        dispatch(setToast({ type: "success", content: data?.message || "Fetched services" }));
        toastShown.current = true
      }
    } catch (error) {
      console.log(error);
      dispatch(setToast({ type: "error", content: "Something went wrong while fetching" }));
    } finally { setIsLoading(false); }
  }, [page, queryObject]);

  // Reset page when filters change
  useEffect(() => { setPage(1); setHasMore(true); }, [queryObject]);

  const debouncedFetch = useCallback(debounce(fetchServices, 800), [fetchServices]);
  useEffect(() => {
    if (isQueryEmpty(queryObject)) {
      // Agar queryObject empty hai → API call skip karo
      console.log("⚠️ Skipping fetch, empty filters");
      dispatch(setListing([])); // Optional: default empty listing dikhane ke liye
      return;
    }

    if (page === 1) {
      debouncedFetch();
    } else {
      fetchServices();
    }
  }, [page, queryObject]);

  // Geolocation
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) return dispatch(setToast({ type: "error", content: "Geolocation not supported" }));

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        setIsLoading(true);
        const location = await fetchLocation(latitude, longitude);
        handleFilterQuery("location", location);
        dispatch(setToast({ type: "success", content: "Location fetched successfully" }));
      } catch (err) {
        dispatch(setToast({ type: "error", content: "Location not fetched" }));
      } finally { setIsLoading(false); }
    }, (error) => {
      dispatch(setToast({ type: "error", content: error.message || "Location not fetched" }));
    }, { enableHighAccuracy: true, timeout: 10000 });
  };

  const fetchLocation = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`
    );
    const data = await response.json();
    const address = data.address || {};
    return address.city || address.town || address.village || "Unknown";
  };

  const handleViewService = (service) => setViewServiceDetail(service);

  const handleScroll = () => {
    if (!rightPaneRef.current || isLoading || !hasMore) return;
    const container = rightPaneRef.current;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
      setPage(prev => prev + 1);
    }
  };

  if (!listing) return <ViewListingSkeleton />;

  return (
    <div className='min-h-screen w-screen bg-gray-100'>
      {viewServiceDetail && <ViewService handleViewService={handleViewService} service={viewServiceDetail} />}
      {isLoading && page === 1 && <Loader />}

      <div className='h-full w-full flex flex-col md:flex-row'>
        {/* Left Panel */}
        <div className='flex flex-col md:w-1/4 gap-2 shadow-sm border-r px-2 py-2 bg-gray-50'>
          <h1 className='py-2 text-xl font-medium'>Filters</h1>

          {/* Mobile filters */}
          <div className="md:hidden flex flex-col gap-2">
            {Object.keys(filters).map(filterKey => (
              <div key={filterKey}>
                <button
                  onClick={() => toggleFilter(filterKey)}
                  className='w-full flex justify-between items-center bg-white px-3 py-2 rounded shadow text-sm font-medium'
                >
                  {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                  <span>{expandedFilters[filterKey] ? "-" : "+"}</span>
                </button>
                {expandedFilters[filterKey] && (
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {filters[filterKey].map((item, idx) => {
                      const isActive = filterKey === "price"
                        ? queryObject.price.some(p => p.min === item.min && p.max === item.max)
                        : queryObject[filterKey].includes(item);
                      return (
                        <label key={idx} className="flex items-center gap-2 text-sm">
                          <input
                            type={filterKey === "price" ? "radio" : "checkbox"}
                          
                            onChange={() => handleFilterQuery(filterKey, filterKey === "price" ? { min: item.min, max: item.max } : item)}
                            className="accent-teal-600"
                          />
                          {item.label ? item.label : item}
                        </label>
                      );
                    })}
                    {filterKey === "location" && (
                      <button
                        onClick={handleCurrentLocation}
                        className="px-2 py-2 text-xs rounded-full border bg-white text-blue-400 flex-shrink-0"
                      >
                        <i className="ri-map-pin-fill"></i> Current
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop filters */}
          <div className="hidden md:block">
            {Object.keys(filters).map((filterKey, i) => (
              <div key={i} className='mb-2'>
                <button
                  onClick={() => toggleFilter(filterKey)}
                  className='w-full justify-between items-center px-2 py-2 flex bg-white rounded shadow hover:bg-gray-100'
                >
                  <span className='capitalize font-medium'>{filterKey}</span>
                  <span className='text-gray-600'>{expandedFilters[filterKey] ? "-" : "+"}</span>
                </button>
                {expandedFilters[filterKey] && (
                  <div className='space-y-1 mt-1 ml-2'>
                    {filters[filterKey].map((item, idx) => {
                      const isChecked = filterKey === "price"
                        ? queryObject.price.some(p => p.min === item.min && p.max === item.max)
                        : queryObject[filterKey].includes(item);
                      return (
                        <label key={idx} className="flex items-center gap-2 text-sm">
                          <input
                            type={filterKey === "price" ? "radio" : "checkbox"}
                            checked={isChecked}
                            onChange={() => handleFilterQuery(filterKey, filterKey === "price" ? { min: item.min, max: item.max } : item)}
                            className="accent-teal-600"
                          />
                          {item.label ? item.label : item}
                        </label>
                      );
                    })}
                    {filterKey === "location" && (
                      <button
                        onClick={handleCurrentLocation}
                        className="text-blue-400 cursor-pointer px-2 py-1 rounded hover:bg-gray-200 flex items-center gap-1 text-sm w-full"
                      >
                        <i className="ri-map-pin-fill text-blue-400"></i> Use current location
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div
          ref={rightPaneRef}
          onScroll={handleScroll}
          className='overflow-y-scroll w-full md:w-3/4 p-4 max-h-screen'
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Available Services</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {listing?.length > 0 ? listing.map(list => (
              <ServiceCard
                handleViewService={handleViewService}
                category={location.state}
                service={list}
                key={list._id}
              />
            )) : (
              <div className='col-span-2 flex flex-col px-5 py-3 shadow-sm shadow-gray-200 justify-center items-center'>
                <h2 className='text-2xl md:text-4xl mb-3 text-gray-400'>Oops! No service available with current filters</h2>
                <img src={NotFound} alt="Not Found" />
              </div>
            )}
          </div>

          {isLoading && page > 1 && <p className="text-center py-4">Loading more...</p>}
          {!hasMore && listing?.length > 0 && <p className="text-center py-4 text-gray-500">No more services</p>}
        </div>
      </div>
    </div>
  );
};

export default ServiceListing;
