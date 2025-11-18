import React, { useEffect, useRef, useState } from "react";
import Cover1 from "../../assets/cover1.jpg";
import Button from "../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setToast } from "../../redux/toastSlice";
import UserNotLogin from "../Other/UserNotLogin";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios/axiosinstance.js";
import { addnewUserBooking } from "../../redux/userSlice.js";
import useAsyncWrap from "../../utils/helper/asyncWrap.js";
import { createBookingApi } from "../../api/BookingApi/bookingApi.js";

const ViewService = ({ service, handleViewService }) => {
  const [notUserModal, setnotUserModal] = useState(false);
  const navigate = useNavigate();
  const pageLocation = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const submitRef = useRef(null);
  const asyncWrap = useAsyncWrap();

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const {
    title = "Premium Home Cleaning",
    description = "We provide top-notch home cleaning services with eco-friendly products and professional staff.",
    price = 499,
    location = "Jabalpur, India",
    gallery,
    reviews = [],
  } = service || {};

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleBookingValidation = (details) => {
    if (!user) {
      setnotUserModal(true);
      return false;
    }

    const workingDay = new Date(details.workingDate).getDay();
    const selectedDate = new Date(details?.workingDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
    const diff = selectedDate.getTime() - now.getTime();

    if (diff < 0) {
      dispatch(setToast({ type: "error", content: "Working date should be valid (not past date)" }));
      return false;
    }

    if (!(details.preferdDay.toLowerCase().includes(days[workingDay]))) {
      dispatch(setToast({ type: "warning", content: "Preferred day doesn’t match selected date." }));
      return false;
    }

    return true;
  };

  const handleNavigate = (navigatePath) => {
    navigate(navigatePath, { state: { from: window.location.pathname } });
  };

  const handleBooking = async (formData) => {
    if (!handleBookingValidation(formData)) return;
      const {data} = await asyncWrap(()=>createBookingApi({
        service: service?._id,
        user: user?._id,
        provider: service?.serviceProvider?._id,
        details: formData,
      }));
      dispatch(addnewUserBooking(data?.data?.data));
      handleViewService(null);
   
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full md:w-[85%] lg:w-[80%] h-screen bg-white rounded shadow-lg flex flex-col overflow-hidden">
        {notUserModal && <UserNotLogin handleNavigate={handleNavigate} />}

        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <i className="ri-service-line text-teal-600"></i> Service Details
          </h1>
          <button onClick={() => handleViewService(null)} className="text-2xl hover:text-red-500 transition">
            <i className="ri-close-line"></i>
          </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
          {/* Provider Info */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <img
                src={service?.serviceProvider?.profilePicture?.url || Cover1}
                alt="provider"
                className="h-14 w-14 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-gray-800">{service?.serviceProvider?.fullName || "Unknown"}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <i className="ri-shield-check-line text-green-500"></i> Verified Provider
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full capitalize">
              {service?.category || "General"}
            </span>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-3">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Price:</strong> ₹{price}</p>
              <p><strong>Location:</strong> {location}</p>
              <p>
                <strong>Available Days:</strong>{" "}
                {service?.availableDays?.length > 0
                  ? service.availableDays.join(", ")
                  : "Not specified"}
              </p>
              <p><strong>Duration:</strong> {service?.duration || "N/A"}</p>
              <p><strong>Discount:</strong> {service?.discount ? `${service.discount}% OFF` : "No discount"}</p>
            </div>

            {/* Booking Form */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Your Requirement</h2>

              <form onSubmit={handleSubmit(handleBooking)} className="space-y-5">
                {/* Payment Offer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment You Offer (₹)</label>
                  <input
                    {...register("offerPayment", {
                      required: "Payment is required",
                      min: { value: 50, message: "Minimum offer ₹50" },
                    })}
                    type="number"
                    placeholder="Enter amount"
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                  {errors.offerPayment && <p className="text-red-700 text-sm">{errors.offerPayment.message}</p>}
                </div>

                {/* Preferred Day */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Preferred Day</label>
                  <select
                    {...register("preferdDay", { required: "Please select a preferred day" })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  >
                    <option value="">-- Select Day --</option>
                    {service?.availableDays?.map((day, i) => (
                      <option key={i} value={day}>{day}</option>
                    ))}
                  </select>
                  {errors.preferdDay && <p className="text-red-700 text-sm">{errors.preferdDay.message}</p>}
                </div>

                {/* Preferred Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Duration</label>
                  <select
                    {...register("offerDuration", { required: "Please select duration" })}
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  >
                    <option value="">-- Select Duration --</option>
                    <option value="full-day">Full Day</option>
                    <option value="half-day">Half Day</option>
                    <option value="2-hours">2 Hours</option>
                    <option value="6-hours">6 Hours</option>
                  </select>
                  {errors.offerDuration && <p className="text-red-700 text-sm">{errors.offerDuration.message}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Date</label>
                  <input
                    {...register("workingDate", { required: "Working date is required" })}
                    type="date"
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                  {errors.workingDate && <p className="text-red-700 text-sm">{errors.workingDate.message}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    {...register("notes")}
                    rows="3"
                    placeholder="Describe your requirement..."
                    className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
                  />
                </div>

                <button ref={submitRef} type="submit" className="hidden">submit</button>
              </form>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Gallery</h2>
            {gallery?.details?.length > 0 ? (
              <div className="flex gap-5 overflow-x-auto no-scrollbar py-2">
                {gallery.details.map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    alt="service"
                    className="min-w-[280px] h-56 object-cover rounded shadow-sm hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Gallery not added</p>
            )}
          </div>

          {/* Reviews */}
          <div className="max-h-96 overflow-y-auto no-scrollbar">
            <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
            {reviews?.length > 0 ? (
              <div className="space-y-4">
                {reviews?.map((item, i) => (
                  <div key={i} className="bg-gray-50 max-w-sm p-4 rounded shadow flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                      {item?.user?.fullName?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item?.user?.fullName || "Unknown"}</p>
                      <p className="text-sm text-gray-600">{item?.comment}</p>
                      <p className="text-yellow-500 text-sm">
                          {
                          Array.from({length:5}).fill("_").map((it,ind)=>{

                           if(ind < item?.rating){
                             return <i className="ri-star-fill"></i>
                           }else{
                            return <i className="ri-star-line text-gray-500"></i>
                           }
})
                         }
                        <span className="text-gray-400">({item?.rating}/5)</span>
                      </p>

                     
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet</p>
            )}
          </div>
        </main>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t bg-white">
          <Button onClick={() => submitRef.current.click()} variant="apply">
            <i className="ri-shopping-bag-3-line mr-2"></i> Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewService;
