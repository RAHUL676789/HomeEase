import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios/axiosinstance";
import { setToast } from "../../redux/toastSlice";
import { Link } from "react-router-dom";
import { debounce } from "../../utils/helper/debounce";
import UserBookingView from "../../Components/User/UserBookingView";
import UserBookingCard from "../../Components/User/UserBookingCard";




const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [userViewBooking, setuserViewBooking] = useState(null) 
  const [isAutoDeleted, setisAutoDeleted] = useState(user?.settings?.isAutoDeleteBookings || false);
  const [isUpdation, setisUpdation] = useState(false)
  const dispatch = useDispatch();
  const [filteredBookings, setfilteredBookings] = useState([])
  const [filters, setfilters] = useState({
    pending: false,
    accepted: false,
    rejected: false,
    cancelled: false,
    completed: false,
    expired:false
  });

  const handleUpdateFilters = (filter) => {
    setfilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };



  useEffect(() => {
    if (isUpdation) {
      handleAutoDeleteBooking(isAutoDeleted)
    }
  }, [isAutoDeleted])

  const applyfilter = ()=>{
 
    let result  = user?.bookings || [];
    result = result.filter((res,i)=> filters[res.status]);
    setfilteredBookings(result);
   
  }

  const debouncedApplyFilters = useCallback(debounce(applyfilter,500),[filters,user])
  useEffect(()=>{
    debouncedApplyFilters()
  },[filters,debouncedApplyFilters])

  const handleAutoDeleteBooking = async (isAutoDeleted) => {
    try {
      const response = await axios.put(`/api/users/settings/${user?._id}`, { isAutoDeleted });
    
      dispatch(setToast({ type: "success", content: response?.data?.message || "setting updated" }))

    } catch (error) {
      console.log(error, "this error comes from isAutoDeleteBookings")
      dispatch(setToast({ type: "error", content: error?.message || "someting went wrong" }))
    }
  }

  const handleViewBooking = (data)=>{
    setuserViewBooking(data);
  }

 const isFilter = Object.keys(filters).some(b=>filters[b])

  const bookingsToRender = isFilter  ? filteredBookings : user?.bookings;
 
  const buttonClass =
    "border px-3 rounded-full text-xs sm:text-sm py-1 capitalize transition-all duration-300";
  return (
    <div className="max-w-6xl mx-auto h-[90vh] overflow-scroll no-scrollbar bg-white rounded-xl shadow-md shadow-gray-400 p-5 sm:p-8">
      {/* Header Section */}
      {userViewBooking && <UserBookingView booking={userViewBooking} handleViewBooking={handleViewBooking}/>}
      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            Auto Delete Expired Bookings
          </p>

          {/* Toggle Switch */}
          <div
            onClick={() => {
              setisAutoDeleted((prev) => !prev)
              setisUpdation(true)
            }}
            className={`h-6 w-12 flex items-center px-1 rounded-full cursor-pointer transition-colors duration-500 ${isAutoDeleted ? "bg-teal-500" : "bg-gray-300"
              }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white shadow-md transform transition-transform duration-500 ${isAutoDeleted ? "translate-x-6" : "translate-x-0"
                }`}
            ></div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <p className="text-gray-600 text-sm sm:text-base font-medium">Filters:</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["pending", "accepted", "rejected", "cancelled", "completed","expired"].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleUpdateFilters(btn)}
                className={`${buttonClass} ${filters[btn]
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
        {/* Left Profile Section */}
        <div className="flex flex-col items-center border-b md:border-b-0 md:border-r md:pr-6 pb-6 md:pb-0">
          <div className="h-20 w-20 border-2 border-teal-400 rounded-full flex justify-center items-center bg-gray-50 shadow-sm">
            <i className="ri-user-3-line text-4xl text-teal-500"></i>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-teal-700 text-center">
            {user?.fullName}
          </h2>
          <p className="text-sm text-gray-500 text-center break-all">{user?.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Joined:{" "}
            {new Date(user?.createdAt).toLocaleDateString().split("/").join("-")}
          </p>
          <p className="mt-4 bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg text-sm sm:text-base">
            Total Bookings: {user?.bookings?.length}
          </p>
        </div>

        {/* Right Section - Recent Bookings */}
        <div className="col-span-2">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
            Recent Bookings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2  ">
            {bookingsToRender?.length ? (
              bookingsToRender?.map((b, i) => (
             <UserBookingCard booking={b} handleViewBooking={handleViewBooking}/>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full py-10">
                no Booking Found
                <button className="block mx-auto border px-5 py-2 rounded bg-teal-500 text-white font-semibold ">
                  <Link to={"/services"}>
                    Book Now
                  </Link>
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
