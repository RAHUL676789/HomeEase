import React from "react";

const UserBookingCard = ({
  booking,
  handleViewBooking,
  handleUserBookingUpdate,
  setisCompleted,
  handleUserBookingDelete,
}) => {

  console.log(booking)
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <i className="ri-loader-4-line text-yellow-500 text-lg animate-spin"></i>,
          color: "text-yellow-600 bg-yellow-50",
        };
      case "accepted":
        return {
          icon: <i className="ri-checkbox-circle-fill text-green-500 text-lg"></i>,
          color: "text-green-600 bg-green-50",
        };
      case "rejected":
        return {
          icon: <i className="ri-close-circle-fill text-orange-500 text-lg"></i>,
          color: "text-orange-600 bg-orange-50",
        };
      case "cancelled":
        return {
          icon: <i className="ri-forbid-2-fill text-red-500 text-lg"></i>,
          color: "text-red-600 bg-red-50",
        };
      case "completed":
        return {
          icon: <i className="ri-check-double-fill text-blue-500 text-lg"></i>,
          color: "text-blue-600 bg-blue-50",
        };
      case "expired":
        return {
          icon: <i className="ri-time-line text-gray-500 text-lg"></i>,
          color: "text-gray-600 bg-gray-100",
        };
      default:
        return { icon: null, color: "" };
    }
  };

  const { icon, color } = getStatusStyle(booking?.status || "");

  return (
    <div className="w-full px-3 sm:px-6 py-4 md:mx-auto max-w-4xl relative">

      <div
        onClick={(e) => handleViewBooking(booking)}
        key={booking?._id}
        className="p-4 sm:p-5 bg-white shadow-md hover:shadow-xl rounded border border-gray-100 
                   transition-all duration-300 relative w-full"
      >
        <i
          onClick={(e) => handleUserBookingDelete(e, booking?._id)}
          className="ri-delete-bin-line absolute right-2 top-2 text-red-600 text-lg sm:text-xl"
        ></i>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">
              {booking?.service?.title ||
                booking?.service?.category ||
                "Service"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Provider: {booking?.provider?.fullName || "Unknown"}
            </p>
          </div>

          <span
            className={`flex items-center gap-1 text-xs sm:text-sm font-medium px-3 py-1 rounded-full capitalize ${color}`}
          >
            {icon}
            {booking?.status}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-1">
          <i className="ri-calendar-line text-gray-500 mr-2"></i>
          {new Date(booking?.createdAt).toLocaleDateString()}
        </div>

        {/* Time */}
        <div className="flex items-center text-gray-600 text-xs sm:text-sm">
          <i className="ri-time-line text-gray-500 mr-2"></i>
          {new Date(booking?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex flex-wrap gap-2 justify-end">

          {booking?.status === "pending" && (
            <button
              onClick={(e) =>
                handleUserBookingUpdate(e, booking._id, { status: "cancelled" })
              }
              className="px-3 sm:px-4 py-2 bg-yellow-500 hover:bg-yellow-600 
                         text-white text-xs sm:text-sm rounded-lg transition-all"
            >
              Cancel Booking
            </button>
          )}

          {booking?.status === "accepted" && (
            <button
              onClick={(e) =>
                handleUserBookingUpdate(e, booking, { status: "completed" })
              }
              className="px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 
                         text-white text-xs sm:text-sm rounded-lg transition-all"
            >
              Mark as Completed
            </button>
          )}

          {booking?.status === "completed" && (
            <button className="px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 
                               text-white text-xs sm:text-sm rounded-lg transition-all">
              Book Again
            </button>
          )}

          {booking?.status === "rejected" && (
            <button className="px-3 sm:px-4 py-2 bg-orange-500 hover:bg-orange-600 
                               text-white text-xs sm:text-sm rounded-lg transition-all">
              Contact Support
            </button>
          )}

          {booking?.status === "cancelled" && (
            <button className="px-3 sm:px-4 py-2 bg-gray-400 hover:bg-gray-500 
                               text-white text-xs sm:text-sm rounded-lg transition-all">
              Rebook
            </button>
          )}

          {booking?.status === "expired" && (
            <button className="px-3 sm:px-4 py-2 bg-red-500 hover:bg-red-600 
                               text-white text-xs sm:text-sm rounded-lg transition-all">
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Add review button */}
      {booking?.status === "completed" && (
        <button
          onClick={() => setisCompleted(booking)}
          className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-gray-700
                     hover:text-yellow-600 border absolute bottom-10 left-4 sm:left-10 
                     border-gray-300 rounded-md px-2 py-1 sm:px-2.5 sm:py-1 transition-all 
                     duration-200 hover:border-yellow-500 hover:bg-yellow-50"
        >
          <i className="ri-star-smile-line text-yellow-500 text-sm"></i>
          Add Review
        </button>
      )}
    </div>
  );
};

export default UserBookingCard;
