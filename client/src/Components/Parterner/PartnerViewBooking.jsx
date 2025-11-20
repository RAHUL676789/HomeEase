import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { socket } from "../../socket/socket";
import PartnerUpcomingTimer from "./PartnerUpcomingTimer";
import PartnerBookingCancel from "./PartnerBookingCancel";
import { setToast } from "../../redux/toastSlice.js";
import { useDispatch } from "react-redux";
import {
  updatePartnerBooking,
  deletePartnerBooking,
} from "../../redux/partnerSlice.js";
import useAsyncWrap from "../../utils/helper/asyncWrap.js";
import {
  deleteBookingByPartner,
  updatesBookingByPartnerApi,
} from "../../api/BookingApi/bookingApi.js";

const PartnerViewBooking = ({ booking, handleSetViewItem }) => {
  const [cancelModal, setcancelModal] = useState(false);
  const dispatch = useDispatch();
  const asyncWrap = useAsyncWrap();

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => (body.style.overflow = "auto");
  }, []);

  const acceptedDateIsValidOrnot = (bookingDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookDate = new Date(bookingDate);
    bookDate.setMinutes(bookDate.getMinutes() + bookDate.getTimezoneOffset());
    const diff = bookDate.getTime() - today.getTime();
    if (diff < 0) {
      dispatch(
        setToast({
          type: "warning",
          content: "You can't accept a booking for today's date",
        })
      );
      return true;
    }
    return false;
  };

  const handleCancelAndDelete = async (bookingId) => {
    const { data } = await asyncWrap(() => deleteBookingByPartner(bookingId));
    dispatch(deletePartnerBooking(data?.data?.data));
    handleSetViewItem(null);
  };

  const updateBooking = async (booking, updates) => {
    if (updates.status === "accepted") {
      if (acceptedDateIsValidOrnot(booking.createdAt)) return;
    }
    const { data } = await asyncWrap(() =>
      updatesBookingByPartnerApi(booking?._id, updates)
    );
    dispatch(updatePartnerBooking(data?.data?.data));
    handleSetViewItem(null);
  };

  const getStatusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize flex items-center gap-1";
    const map = {
      pending: ["bg-yellow-100 text-yellow-700", "ri-time-line"],
      accepted: ["bg-green-100 text-green-700", "ri-checkbox-circle-fill"],
      rejected: ["bg-orange-100 text-orange-700", "ri-close-circle-fill"],
      cancelled: ["bg-red-100 text-red-700", "ri-forbid-2-fill"],
      completed: ["bg-blue-100 text-blue-700", "ri-check-double-fill"],
    };
    return (
      <span className={`${base} ${map[status][0]}`}>
        <i className={`${map[status][1]} text-sm sm:text-base`} />
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-2 sm:p-4 overflow-auto">
      {cancelModal && (
        <PartnerBookingCancel
          cancelAndDelete={handleCancelAndDelete}
          close={() => setcancelModal(false)}
          booking={booking}
        />
      )}

      <div className="
        w-full md:w-[85%] max-h-[100vh] bg-white rounded shadow-lg border border-gray-200 
        p-4 sm:p-6 overflow-auto animate-fadeIn relative
      ">
        {/* Close Button */}
        <i
          onClick={() => handleSetViewItem(null)}
          className="ri-close-line absolute right-4 top-3 text-xl sm:text-2xl cursor-pointer hover:text-red-500"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center py-3 gap-2 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            {booking?.service?.title || "Booking Details"}
          </h1>
          {getStatusBadge(booking?.status)}
        </div>

        {/* Timeline */}
        <div className="mt-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <i className="ri-time-line text-teal-600" />
            Booking Timeline
          </h2>

          <div className="relative ml-3 sm:ml-4 ">
            {/* Step 1 */}
            <div className={`pl-6 sm:pl-8 border-l-2 pb-12 relative ${booking?.status === "cancelled"
              ? "border-orange-500"
              : "border-green-600"
              }`}>
              <div className={`absolute -left-3 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white border-2 ${booking?.status === "cancelled"
                ? "border-orange-500"
                : "border-green-600"
                }`}>
                <i className={`ri-checkbox-circle-line text-xs sm:text-base ${booking?.status === "cancelled"
                  ? "text-orange-500"
                  : "text-green-600"
                  }`} />
              </div>
              <h3 className="text-sm sm:text-base font-medium text-gray-800">Booking Created</h3>
              <p className={`text-xs sm:text-sm ${booking?.status === "cancelled"
                ? "text-orange-500"
                : "text-green-600"
                }`}>
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Step 2 */}
            <div className={`relative pl-7  pb-12 sm:pl-9 border-l-2
              ${booking.status === "pending" ? "border-gray-300" :
                booking.status === "cancelled" || booking?.status === "rejected" ? "border-orange-500" : "border-green-600"}`}>
              <div className={`
                absolute -left-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2
                flex items-center justify-center
                ${booking.status === "pending" ? "border-gray-300" :
                  booking.status === "cancelled" || booking.status === "rejected" ? "border-orange-500" : "border-green-600"}
              `}>
                <i
                  className={`
                    ri-user-follow-line text-xs sm:text-base
                    ${booking.status === "pending" ? "text-gray-300" :
                      booking.status === "cancelled" || booking.status === "rejected" ? "text-orange-500" : "text-green-600"}
                  `}
                />
              </div>

              <h3 className="text-sm sm:text-base font-medium text-gray-800">Provider Responded</h3>
              <p className={`
                text-xs sm:text-sm mt-1
                ${booking.status === "pending" ? "text-gray-400" :
                  booking.status === "cancelled" || booking.status === "rejected" ? "text-orange-500" : "text-green-600"}
              `}>
                Status: {booking.status}
              </p>
            </div>

            {/* Step 3 */}
            <div className={`relative pl-7 sm:pl-9 
              ${booking.status === "completed" ? "border-green-600" :
                booking.status === "cancelled" || booking.status === "rejected" ? "border-orange-500" : "border-gray-300"}`}>
              <div className={`
                absolute -left-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2
                flex items-center justify-center
                ${booking.status === "completed" ? "border-green-600" :
                  booking.status === "cancelled" || booking.status === "rejected" ? "border-orange-500" : "border-gray-300"}
              `}>
                <i className={`
                  ri-check-double-fill text-xs sm:text-base
                  ${booking.status === "completed" ? "text-green-600" :
                    booking.status === "cancelled" || booking.status === "rejected" ? "text-orange-500" : "text-gray-300"}
                `} />
              </div>

              <h3 className="text-sm sm:text-base font-medium text-gray-800">Booking Completed</h3>
              <p className={`
                text-xs sm:text-sm mt-1
                ${booking.status === "completed" ? "text-green-600" :
                  booking.status === "cancelled" || booking.status === "rejected" ? "text-orange-500" : "text-gray-300"}
              `}>
                Destination: {booking.status}
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-5">
          {/* USER CARD */}
          <div className="p-4 sm:p-5 bg-gray-50 rounded shadow-sm">
            <h2 className="text-sm sm:text-lg font-semibold flex items-center gap-2 mb-3 text-gray-700">
              <i className="ri-user-3-line text-teal-600" /> User Details
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-gray-700">
              <p><strong>Name:</strong> {booking?.user?.fullName}</p>
              <p><strong>Email:</strong> {booking?.user?.email}</p>
              <p><strong>Phone:</strong> {booking?.user?.phone}</p>
            </div>
          </div>

          {/* SERVICE CARD */}
          <div className="p-4 sm:p-5 bg-gray-50 rounded shadow-sm">
            <h2 className="text-sm sm:text-lg font-semibold flex items-center gap-2 mb-3 text-gray-700">
              <i className="ri-hand-heart-line text-teal-600" /> Service Information
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-gray-700">
              <p><strong>Category:</strong> {booking?.service?.category}</p>
              <p><strong>Price:</strong> ₹{booking?.service?.price}</p>
              <p><strong>Duration:</strong> {booking?.service?.duration}</p>
              <p><strong>Description:</strong> {booking?.service?.description}</p>
            </div>
          </div>

          {/* DETAILS CARD */}
          <div className="sm:col-span-2 p-4 sm:p-5 bg-gray-50 rounded shadow-sm">
            <h2 className="text-sm sm:text-lg font-semibold flex items-center gap-2 mb-3 text-gray-700">
              <i className="ri-information-line text-teal-600" /> Booking Details
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-gray-700">
              <p><strong>Offer Payment:</strong> ₹{booking?.details?.offerPayment}</p>
              <p><strong>Offer Duration:</strong> {booking?.details?.offerDuration}</p>
              <p><strong>Working Date:</strong>
                {new Date(booking?.details?.workingDate).toLocaleDateString()}
              </p>
              <p><strong>Preferred Day:</strong> {booking?.details?.preferdDay}</p>
              <p><strong>Message:</strong> {booking?.details?.notes}</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-end mt-8 gap-3">
          {booking.status === "pending" && (
            <Button onClick={() => updateBooking(booking, { status: "accepted" })} variant={"apply"}>
              Accept
            </Button>
          )}

          {booking.status === "pending" && (
            <Button variant={"delete"} onClick={() => updateBooking(booking, { status: "rejected" })}>
              Reject
            </Button>
          )}

          {booking.status === "accepted" && (
            <Button onClick={() => setcancelModal(true)} variant={"cancel"}>
              Cancel
            </Button>
          )}


          <Button onClick={() => setcancelModal(true)} variant={"delete"}>
            Delete
          </Button>


          <Button variant={"next"}>
            <i className="ri-chat-1-line mr-1" /> contact support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerViewBooking;
