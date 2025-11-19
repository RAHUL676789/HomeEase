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
import Loader from "../Other/Loader.jsx";
import useAsyncWrap from "../../utils/helper/asyncWrap.js";
import { deleteBookingByPartner, updatesBookingByPartnerApi } from "../../api/BookingApi/bookingApi.js";

const PartnerViewBooking = ({ booking, handleSetViewItem }) => {
  const [cancelModal, setcancelModal] = useState(false);
  const dispatch = useDispatch();
  const asyncWrap = useAsyncWrap();
  console.log(booking)

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
      const response =await asyncWrap(()=>deleteBookingByPartner(bookingId)); 
      dispatch(deletePartnerBooking(response?.data?.data));
      handleSetViewItem(null); 
  };

  const updateBooking = async (booking, updates) => {
    if (updates.status === "accepted") {
      if (acceptedDateIsValidOrnot(booking.createdAt)) return;
    }
      const {data} = await asyncWrap(()=>updatesBookingByPartnerApi(booking?._id,updates));
      dispatch(updatePartnerBooking(data?.data?.data));
      handleSetViewItem(null);
  };

  const getStatusBadge = (status) => {
    const base =
      "px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1";
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-orange-100 text-orange-700",
      cancelled: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
    };
    const iconMap = {
      pending: "ri-time-line",
      accepted: "ri-checkbox-circle-fill",
      rejected: "ri-close-circle-fill",
      cancelled: "ri-forbid-2-fill",
      completed: "ri-check-double-fill",
    };
    return (
      <span className={`${base} ${statusMap[status]}`}>
        <i className={`${iconMap[status]} text-base`}></i>
        {status}
      </span>
    );
  };

  // timeline steps (taken from UserBookingView)
  const timelineSteps = [
    {
      key: "pending",
      label: "Booking Request",
      icon: "ri-time-line",
      color: "text-yellow-500 border-yellow-300",
    },
    {
      key: "accepted",
      label: "Accepted by Partner",
      icon: "ri-checkbox-circle-line",
      color: "text-green-500 border-green-300",
    },
    {
      key: "completed",
      label: "Work Completed",
      icon: "ri-check-double-line",
      color: "text-blue-500 border-blue-300",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      icon: "ri-forbid-2-line",
      color: "text-red-500 border-red-300",
    },
    {
      key: "rejected",
      label: "Rejected",
      icon: "ri-close-circle-line ",
      color: "text-orange-500 border-orange-300",
    },
  ];

  const currentStatusIndex = timelineSteps.findIndex(
    (step) => step.key === booking?.status
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 overflow-auto">
   
      {cancelModal && (
        <PartnerBookingCancel
          cancelAndDelete={handleCancelAndDelete}
          close={() => setcancelModal(false)}
          booking={booking}
        />
      )}

      <div className="mx-auto h-[100vh] w-full md:w-[85%] bg-white overflow-auto p-6 relative rounded flex flex-col shadow-2xl border border-gray-200 animate-fadeIn">
        <i
          onClick={() => handleSetViewItem(null)}
          className="ri-close-line absolute right-7 top-0 hover:text-red-500 cursor-pointer"
        ></i>




        {/* Header */}
        <div className="flex justify-between items-center py-4 flex-wrap gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {booking?.service?.title || "Booking Details"}
          </h1>
          {getStatusBadge(booking?.status)}
        </div>

          <div className="mt-0 ">
                    <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
                        <i className="ri-time-line text-teal-600"></i>
                        Booking Timeline
                    </h2>
                    <div className={`relative   ml-4 `}>
                        {/* Created */}
                        <div className={`px-6 ml-6 h-24 border-l-2 relative ${booking?.status === "cancelled"  ? "border-orange-500 " : "border-green-600"}`}>

                            <div className={`absolute -left-3  w-6 h-6 flex items-center justify-center rounded-full bg-white border-2 ${booking?.status === "cancelled"  ? "border-orange-500" :"border-green-600"}`}>
                                <i className={`ri-checkbox-circle-line ${ booking?.status === "cancelled" ? "text-orange-500 " :"text-green-600"}`}></i>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-800">Booking Created</h3>

                                <p className={`text-sm ${booking?.status === "cancelled" ? "text-orange-500" :"text-green-600"} `}>
                                    {new Date(booking.createdAt).toLocaleDateString().split("/").join("-")}
                                </p>
                            </div>
                        </div>

                        {/* Provider Responded */}

                        <div className={` ml-6 h-24 px-6  border-l-2  relative ${booking?.status === "pending" ? "border-gray-300 opacity-70" : booking?.status === "cancelled" ? "border-orange-500" : "border-green-600"}` }>
                            <div className={`absolute 
                                    -left-3  w-6 h-6 flex items-center justify-center rounded-full border-2 ${booking?.status === "pending" ? "border-gray-300 " : booking.status === "cancelled" ? "border-orange-500" : "border-green-600"} bg-white`}>
                                <i className={`ri-user-follow-line ${booking?.status === "pending" ? "text-gray-400" : booking?.status == "cancelled" ? "text-orange-500" : booking?.status === "accepted" && "text-green-600"} `}></i>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">
                                    Provider Responded
                                </h3>
                                <p className={`text-sm ${booking?.status === "pending" ? "text-gray-400" : booking?.status === "cancelled" ? "text-orange-500 " : "text-green-600"} `}>
                                    Status: {booking?.status}
                                </p></div>
                        </div>



                        <div className={`mb-6 px-6 ml-6 border-l-2 relative ${booking?.status === "pending"  ? "border-gray-200" : booking?.status === "cancelled"  ? "border-orange-500 " :booking?.status === "completed" ?  "border-green-600" : ""} `}>
                            <div className={`absolute -left-3 bottom-0 w-6 h-6 flex items-center justify-center rounded-full bg-white border-2  ${booking?.status === "completed" ? "border-green-600" : booking?.status === "cancelled" ? "border-orange-500" : "border-gray-300"}`}>
                                <i className={`ri-check-double-fill  ${booking?.status === "pending"  ? "text-gray-300 " : booking?.status === "cancelled" ?"text-orange-500 " : booking?.status === "completed" ? "text-green-600" :"text-gray-300"}`}></i>
                            </div>

                            <div>
                                <h3 className={`text-gray-800 font-medium`}>
                                    Booking  Completed
                                </h3>
                                <p className={`text-sm  ${booking?.status === "pending" ? "text-gray-400" : booking?.status === "cancelled" ? "text-orange-500 " : "text-green-600 "}`}>
                                    Destination: {booking?.status}
                                </p></div>

                        </div>

                    </div>
                </div>

        <p className="text-sm text-gray-500 mt-1">
          Booking created on:{" "}
          {new Date(booking?.createdAt).toLocaleDateString()}
        </p>

        <div className="h-[1px] bg-gray-200 my-6"></div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="p-5 shadow-sm hover:shadow-md rounded  bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="ri-user-3-line text-teal-600"></i>
              User Details
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {booking?.user?.fullName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {booking?.user?.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {booking?.user?.phone || "N/A"}
              </p>
            </div>
          </div>

          {/* Service Info */}
          <div className="p-5  shadow-sm hover:shadow-md rounded  bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="ri-hand-heart-line text-teal-600"></i>
              Service Information
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p>
                <strong>Category:</strong> {booking?.service?.category || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> ₹{booking?.service?.price || "N/A"}
              </p>
              <p>
                <strong>Duration:</strong> {booking?.service?.duration || "N/A"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {booking?.service?.description || "N/A"}
              </p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-5  shadow-sm hover:shadow-md rounded  bg-gray-50 sm:col-span-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <i className="ri-information-line text-teal-600"></i>
              Booking Details
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              <p>
                <strong>Offer Payment:</strong>{" "}
                ₹{booking?.details?.offerPayment || "N/A"}
              </p>
              <p>
                <strong>Offer Duration:</strong>{" "}
                {booking?.details?.offerDuration || "N/A"}
              </p>
              <p>
                <strong>Working Date:</strong>{" "}
                {new Date(
                  booking?.details?.workingDate
                ).toLocaleDateString() || "N/A"}
              </p>
              <p>
                <strong>Preferred Day:</strong>{" "}
                {booking?.details?.preferdDay || "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {booking?.details?.notes || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}


        {/* Action Buttons */}
        <div className="flex justify-end mt-10 gap-3 flex-wrap">
          {booking.status === "pending" && (
            <Button
              onClick={() => updateBooking(booking, { status: "accepted" })}
              variant={"apply"}
            >
              Accept
            </Button>
          )}

          {booking.status !== "accepted" && booking.status !== "rejected" && (
            <Button
              variant={"delete"}
              onClick={() => updateBooking(booking, { status: "rejected" })}
            >
              Reject
            </Button>
          )}

          {booking.status === "accepted" && (
            <Button onClick={() => setcancelModal(true)} variant={"cancel"}>
              Cancel
            </Button>
          )}

          {booking.status === "rejected" && (
            <Button onClick={() => setcancelModal(true)} variant={"delete"}>
              Delete
            </Button>
          )}

          <div className="ml-auto">
            <Button variant={"next"}>
              <i className="ri-chat-1-line mr-1"></i>Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerViewBooking;
