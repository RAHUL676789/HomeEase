import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PartnerBookingCard from "../../Components/Parterner/PartnerBookingCard";
import PartnerViewBooking from "../../Components/Parterner/PartnerViewBooking";
import { debounce } from "../../utils/helper/debounce.js";
import NotFound from "../../assets/NotFound.svg"
import { socket } from "../../socket/socket.js";
import { setPartner } from "../../redux/partnerSlice.js";
import ToastContainer from "../../Components/Other/ToastContainer.jsx";

const PartnerBookings = () => {
  const { partner, loading } = useSelector((state) => state.partner);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [viewBookingItem, setViewBookingItem] = useState(null);
  const [filters, setFilters] = useState({ category: [], status: [] });
  const [filteredBookings, setFilteredBookings] = useState(null);
  const [searchInp, setsearchInp] = useState("");
  const [toast, settoast] = useState({
    status: false,
    type: "",
    content: "",
    trigger: ""
  })

  // -------------------- Handlers --------------------

  // Toggle filter values (status / category)
  const handleFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value.toLowerCase())
        ? prev[key].filter((item) => item !== value.toLowerCase())
        : [...prev[key], value.toLowerCase()],
    }));
  };

  // Apply filters to partner bookings
  const applyFilters = () => {
    if (filters.category.length === 0 && filters.status.length === 0) {
      setFilteredBookings(null); // reset
      return;
    }

    const result = partner?.bookings?.filter((item) => {
      const matchCategory = filters.category.includes(
        item.service?.category?.toLowerCase()
      );
      const matchStatus = filters.status.includes(
        item.status?.toLowerCase()
      );
      console.log(matchStatus)
      return matchCategory || matchStatus;
    });

    setFilteredBookings(result);
  };

  const handleSearch = () => {

    console.log("searchFilter", searchInp)
    const searchFilter = partner?.bookings?.filter((item, i) => {
      const mathTitle = item?.service?.title?.toLowerCase().includes(searchInp.toLowerCase())
      const matchCategory = item?.service?.category?.toLowerCase().includes(searchInp.toLowerCase())
      const matchStatus = item?.status?.toLowerCase().includes(searchInp.toLowerCase());

      return mathTitle || matchCategory || matchStatus;
    })

    console.log("searchFilter", searchFilter)

    setFilteredBookings(searchFilter);
  }

  const handleSetToast = (type, content) => {
    const newToast = {
      status: true,
      type,
      content,
      trigger: Date.now()
    }

    settoast(newToast)

  }

  // Debounced version of applyFilters
  const debouncedApplyFilters = useCallback(
    debounce(applyFilters, 500),
    [filters, partner]
  );

  const debounceSearch = useCallback(debounce(handleSearch, 1000), [searchInp])

  // -------------------- Effects --------------------

  // Redirect if no partner
  useEffect(() => {
    if (!partner && !loading) navigate("/login");
  }, [partner, loading, navigate]);

  // Trigger filter when filters change
  useEffect(() => {
    debouncedApplyFilters();
  }, [filters, debouncedApplyFilters]);

  useEffect(() => {
    debounceSearch();
  }, [searchInp])

 
  


  // Final bookings list (either filtered or all)
  const bookingsToRender = filteredBookings || partner?.bookings;

  // -------------------- Render --------------------

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-600">Loading partner data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen w-screen">
      {/* Booking detail view */}
      {viewBookingItem && (
        <PartnerViewBooking
          booking={viewBookingItem}
          handleSetViewItem={setViewBookingItem}
        />
      )}

      {toast.status && <ToastContainer type={toast.type} content={toast.content} trigger={toast.trigger} key={toast.trigger} />}

      <div className="flex gap-6 max-w-[100vw] pr-6">
        {/* ---------------- Sidebar Filters ---------------- */}
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

        {/* ---------------- Bookings List ---------------- */}
        <main className="flex-1 overflow-y-scroll no-scrollbar max-h-screen">
          {/* Search bar */}
          <header className="w-[90%] mx-auto mt-3 shadow-sm shadow-gray-500 rounded-3xl">
            <input
              type="text"
              maxLength={15}
              onChange={(e) => setsearchInp(e.target.value)}
              placeholder="Search here..."
              className="bg-white outline-0 px-5 py-3 w-full rounded-3xl"
            />
          </header>

          {/* Booking Cards */}
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
                <img src={NotFound} alt="not found" />


              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerBookings;
