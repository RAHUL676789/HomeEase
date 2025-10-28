import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PartnerBookingCard from "../../Components/Parterner/PartnerBookingCard";
import PartnerViewBooking from "../../Components/Parterner/PartnerViewBooking";
import { debounce } from "../../utils/helper/debounce.js";
import NotFound from "../../assets/NotFound.svg";


const PartnerBookings = () => {
  const { partner, loading } = useSelector((state) => state.partner);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [viewBookingItem, setViewBookingItem] = useState(null);
  const [filters, setFilters] = useState({ category: [], status: [], searchInp: "" });
  const [filteredBookings, setFilteredBookings] = useState([]);

  const handleFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value.toLowerCase())
        ? prev[key].filter((item) => item !== value.toLowerCase())
        : [...prev[key], value.toLowerCase()],
    }));
  };

  const handleSearch = (item) => {
    if (filters?.searchInp === "") return true; // 🔑 always return true if no search
    const search = filters.searchInp.toLowerCase();
    return (
      item?.service?.title?.toLowerCase().includes(search) ||
      item?.service?.category?.toLowerCase().includes(search) ||
      item?.status?.toLowerCase().includes(search)
    );
  };

  const applyFilters = () => {
    let result = partner?.bookings || [];

    if (filters.category.length > 0) {
      result = result.filter((item) =>
        filters.category.includes(item.service?.category?.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      result = result.filter((item) =>
        filters.status.includes(item.status?.toLowerCase())
      );
    }

    // search filter
    result = result.filter((item) => handleSearch(item));

    setFilteredBookings(result);
  };

  const debouncedApplyFilters = useCallback(
    debounce(applyFilters, 500),
    [filters, partner]
  );

  useEffect(() => {
    if (!partner && !loading) navigate("/login");
  }, [partner, loading, navigate]);

  useEffect(() => {
    debouncedApplyFilters();
  }, [filters, debouncedApplyFilters]);

  let bookingsToRender =
    filteredBookings.length > 0 || filters.searchInp || filters.category.length > 0 || filters.status.length > 0
      ? filteredBookings
      : partner?.bookings || [];

      if(!filters.status.includes("rejected")){
        console.log("rejcting filtering")
         console.log(bookingsToRender)
        bookingsToRender = bookingsToRender.filter(b=>b.status !== "rejected")
        console.log(bookingsToRender)
      }

  bookingsToRender = [...bookingsToRender].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  console.log(filters,"this is filters")
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-600">Loading partner data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen w-screen">
      {viewBookingItem && (
        <PartnerViewBooking
          booking={viewBookingItem}
          handleSetViewItem={setViewBookingItem}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6 max-w-[100vw] pr-6">
        {/* Desktop Sidebar */}
        {/* Desktop Sidebar */}
        <aside className="w-64 h-screen overflow-y-scroll no-scrollbar bg-white shadow-sm shadow-gray-400 hidden md:block">
          <header className="bg-gray-100 shadow rounded">
            <div className="flex items-center gap-2 px-2 py-3">
              <div className="h-12 w-12 bg-teal-700 text-white font-semibold text-xl flex items-center justify-center rounded-full">
                {partner?.fullName?.[0] || "?"}
              </div>
              <div className="flex flex-col leading-4 text-sm overflow-hidden">
                <span className="truncate">{partner?.fullName || "Unknown Partner"}</span>
                <span className="font-semibold truncate">{partner?.email || "no-email"}</span>
              </div>
            </div>
          </header>

          {/* 🔍 Search box for desktop */}
          <div className="px-3 py-2">
            <input
              type="text"
              maxLength={15}
              placeholder="Search here..."
              value={filters.searchInp}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchInp: e.target.value }))
              }
              className="bg-white border border-gray-300 outline-none px-4 py-2 w-full rounded shadow-sm"
            />
          </div>

          <main className="px-2 py-3 space-y-5">
            {/* Status Filters */}
            <div>
              <h3 className="text-lg font-semibold text-teal-700 border-b mb-2">Status</h3>
              {["accepted", "rejected", "requested", "pending"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 m-1 shadow-sm hover:shadow-gray-400 transition-all duration-150 py-2 px-3 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={status}
                    className="accent-teal-400"
                    onChange={(e) => handleFilters("status", e.target.value)}
                  />
                  {status}
                </label>
              ))}
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="text-lg font-semibold text-teal-700 border-b mb-2">Category</h3>
              {["Cleaning", "Plumber", "Beauty", "Car-wash"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 m-1 shadow-sm hover:shadow-gray-400 transition-all duration-150 py-2 px-3 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    className="accent-teal-400"
                    onChange={(e) => handleFilters("category", e.target.value)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </main>
        </aside>


        {/* Mobile Filters */}
        <div className="md:hidden w-full px-3 mt-3">
          <input
            type="text"
            maxLength={15}
            placeholder="Search here..."
            value={filters.searchInp}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchInp: e.target.value }))
            }
            className="bg-white outline-none px-5 py-3 w-full  shadow-sm mb-3"
          />

          {/* Horizontal filter buttons */}
          <div className="flex overflow-x-auto gap-2 py-2">
            {["accepted", "rejected", "requested", "pending"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilters("status", status)}
                className={`px-2 py-1 text-xs rounded-full border ${filters.status.includes(status.toLowerCase())
                    ? "bg-teal-900 text-white"
                    : "bg-white text-gray-700"
                  } shadow-sm flex-shrink-0`}
              >
                {status}
              </button>
            ))}
            {["Cleaning", "Plumber", "Beauty", "Car-wash"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilters("category", cat)}
                className={`px-2 text-xs py-1 rounded-full border ${filters.category.includes(cat.toLowerCase())
                    ? "bg-teal-900 text-white"
                    : "bg-white text-gray-700"
                  } shadow-sm flex-shrink-0`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <main className="flex-1 overflow-y-scroll no-scrollbar max-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-3">
            {bookingsToRender?.map((booking, i) => (
              <PartnerBookingCard
                key={booking._id || i}
                booking={booking}
                setViewBookingItem={setViewBookingItem}
              />
            ))}

            {bookingsToRender?.length === 0 && (
              <p className="text-center text-gray-500 col-span-2 mt-6">
                No bookings match your filters.
                <img src={NotFound} alt="not found" className="mx-auto mt-2" />
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerBookings;
