import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { socket } from "../../socket/socket";
import PartnerUpcomingTimer from "./PartnerUpcomingTimer";
import PartnerBookingCancel from "./PartnerBookingCancel";
import axios from "../../utils/axios/axiosinstance.js";
import { setToast } from "../../redux/toastSlice.js";
import { useDispatch } from "react-redux";
import {
  updatePartnerBooking,
  deletePartnerBooking,
} from "../../redux/partnerSlice.js";
import Loader from "../Other/Loader.jsx";

const PartnerViewBooking = ({ booking, handleSetViewItem }) => {
  const [cancelModal, setcancelModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
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
    try {
      setisLoading(true);
      const response = await axios.delete(`/api/bookings/${bookingId}`);
      dispatch(deletePartnerBooking(response?.data?.data));
      dispatch(
        setToast({
          type: "success",
          content: response?.data?.message || "Booking deleted successfully",
        })
      );
      handleSetViewItem(null);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          content: error.message || "Something went wrong while deleting",
        })
      );
    } finally {
      setisLoading(false);
    }
  };

  const updateBooking = async (booking, updates) => {
    if (updates.status === "accepted") {
      if (acceptedDateIsValidOrnot(booking.createdAt)) return;
    }
    try {
      setisLoading(true);
      const response = await axios.put(`/api/bookings/${booking?._id}`, updates);
      dispatch(updatePartnerBooking(response?.data?.data));
      dispatch(
        setToast({
          type: "success",
          content: response?.data?.message || "Booking updated",
        })
      );
      handleSetViewItem(null);
    } catch (error) {
      dispatch(
        setToast({
          type: "error",
          content:
            error?.message || "Something went wrong while updating booking",
        })
      );
    } finally {
      setisLoading(false);
    }
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
      {isLoading && <Loader />}
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

        <div className="mt-0">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <i className="ri-timeline-view text-teal-600"></i>
            Booking Progress
          </h2>

          <div className={`relative border-l-2  ml-4 ${booking?.status === "accepted" || booking?.status === "completed" ? "border-green-600" : "border-orange-600"}`}>
            <div className="mb-12 ml-6 relative">

              <div className="absolute -left-9  w-6 h-6 flex items-center justify-center rounded-full bg-white border-2 border-blue-500 ">
                <i className="ri-checkbox-circle-line text-blue-500"></i>
              </div>

              <div>
                <h3 className="font-medium text-gray-800">Booking Created</h3>

                <p className="text-sm text-blue-500">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {booking.status !== "pending" && (
              <div className="mb-12 ml-6 relative">
                <div className={`absolute -left-9 w-6 h-6 flex items-center justify-center rounded-full bg-white border-2 ${booking?.status === "accepted" ? "border-green-500" : "border-orange-600"}`}>
                  <i className={`ri-user-follow-line ${booking?.status === "accepted" ? "text-green-500" : "text-orange-600 "} `}></i>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    Provider Responded
                  </h3>
                  <p className={`text-sm ${booking?.status !== "accepted" ? "text-orange-600" : "text-green-500"} `}>
                    Status: {booking.status}
                  </p></div>
              </div>
            )}


            {booking?.status === "completed" &&
              <div className="mb-12 ml-6 relative">
                <div className="absolute -left-9 bottom-0 w-6 h-6 flex items-center justify-center rounded-full bg-white border-2 border-green-500">
                  <i className="ri-check-double-fill text-emerald-500"></i>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800">
                    Booking  Completed
                  </h3>
                  <p className="text-sm text-teal-500">
                    Status: Completed
                  </p></div>

              </div>
            }
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Booking created on:{" "}
          {new Date(booking?.createdAt).toLocaleDateString()}
        </p>

        <div className="h-[1px] bg-gray-200 my-6"></div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="p-5 border rounded-xl shadow-sm bg-gray-50">
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
          <div className="p-5 border rounded-xl shadow-sm bg-gray-50">
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
          <div className="p-5 border rounded-xl shadow-sm bg-gray-50 sm:col-span-2">
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
