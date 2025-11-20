import React from "react";

const UserBookingView = ({ booking, handleViewBooking, handleUserBookingUpdate ,handleUserBookingDelete}) => {

    console.log(booking)

    const getStatusColor = (status) => {
        const base =
            "px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize flex items-center gap-1";

        const statusMap = {
            pending: "bg-yellow-100 text-yellow-700",
            accepted: "bg-green-100 text-green-700",
            rejected: "bg-orange-100 text-orange-700",
            cancelled: "bg-red-100 text-red-700",
            completed: "bg-blue-100 text-blue-700",
            expired: "bg-gray-200 text-gray-700",
        };

        const iconMap = {
            pending: "ri-time-line",
            accepted: "ri-checkbox-circle-fill",
            rejected: "ri-close-circle-fill",
            cancelled: "ri-forbid-2-fill",
            completed: "ri-check-double-fill",
            expired: "ri-timer-2-line",
        };

        return (
            <span className={`${base} ${statusMap[status]}`}>
                <i className={`${iconMap[status]} text-xs sm:text-base`}></i>
                {status}
            </span>
        );
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 overflow-auto p-2">
            <div className="mx-auto h-auto max-h-[100vh] w-full md:w-[85%] bg-white overflow-auto p-4 sm:p-6 relative rounded flex flex-col shadow-2xl border border-gray-200 animate-fadeIn">

                <i
                    onClick={() => handleViewBooking(null)}
                    className="ri-close-line text-xl sm:text-2xl absolute right-4 top-3 hover:text-red-500 cursor-pointer"
                ></i>

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-2 sm:gap-3 text-center sm:text-left">

                    <p className="text-xs sm:text-sm text-teal-500">
                        Working Date:{" "}
                        {new Date(booking?.details?.workingDate).toLocaleDateString()}
                    </p>

                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        {booking?.service?.title}
                    </h1>

                    <div className="flex justify-center sm:justify-end">
                        {getStatusColor(booking?.status)}
                    </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center sm:text-left">
                    Booking created on:{" "}
                    {new Date(booking?.createdAt).toLocaleDateString()}
                </p>

                <div className="h-[1px] bg-gray-200 my-4 sm:my-6"></div>

                {/* TIMELINE */}
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
                        <i className="ri-time-line text-teal-600"></i>
                        Booking Timeline
                    </h2>

                    <div className="relative ml-3 sm:ml-4 ">

                        {/* POINT 1 */}
                        <div
                            className={`pl-6 sm:pl-8 border-l-2 pb-12 relative ${booking?.status === "cancelled"
                                    ? "border-orange-500"
                                    : "border-green-600"
                                }`}
                        >
                            <div
                                className={`absolute -left-3 sm:-left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-white border-2 ${booking?.status === "cancelled"
                                        ? "border-orange-500"
                                        : "border-green-600"
                                    }`}
                            >
                                <i
                                    className={`ri-checkbox-circle-line text-xs sm:text-base ${booking?.status === "cancelled"
                                            ? "text-orange-500"
                                            : "text-green-600"
                                        }`}
                                ></i>
                            </div>

                            <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                                Booking Created
                            </h3>
                            <p
                                className={`text-xs sm:text-sm ${booking?.status === "cancelled"
                                        ? "text-orange-500"
                                        : "text-green-600"
                                    }`}
                            >
                                {new Date(booking?.createdAt)
                                    .toLocaleDateString()
                                    .split("/")
                                    .join("-")}
                            </p>
                        </div>

                        {/* POINT 2 */}
                        <div
                            className={`pl-6 sm:pl-8 border-l-2 pb-12 relative ${booking?.status === "pending"
                                    ? "border-gray-300 opacity-70"
                                    : booking?.status === "cancelled"
                                        ? "border-orange-500"
                                        : "border-green-600"
                                }`}
                        >
                            <div
                                className={`absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2 ${booking?.status === "pending"
                                        ? "border-gray-300"
                                        : booking.status === "cancelled"
                                            ? "border-orange-500"
                                            : "border-green-600"
                                    } flex items-center justify-center`}
                            >
                                <i
                                    className={`ri-user-follow-line text-xs sm:text-base ${booking?.status === "pending"
                                            ? "text-gray-400"
                                            : booking?.status === "cancelled"
                                                ? "text-orange-500"
                                                : "text-green-600"
                                        }`}
                                ></i>
                            </div>

                            <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                                Provider Responded
                            </h3>

                            <p
                                className={`text-xs sm:text-sm ${booking?.status === "pending"
                                        ? "text-gray-400"
                                        : booking?.status === "cancelled"
                                            ? "text-orange-500"
                                            : "text-green-600"
                                    }`}
                            >
                                Status: {booking?.status}
                            </p>
                        </div>

                        {/* POINT 3 */}
                        <div
                            className={`pl-6 sm:pl-8  relative ${booking?.status === "pending"
                                    ? "border-gray-200"
                                    : booking?.status === "cancelled"
                                        ? "border-orange-500"
                                        : booking?.status === "completed"
                                            ? "border-green-600"
                                            : "border-gray-300"
                                }`}
                        >
                            <div
                                className={`absolute -left-3 top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2 flex items-center justify-center ${booking?.status === "completed"
                                        ? "border-green-600"
                                        : booking?.status === "cancelled"
                                            ? "border-orange-500"
                                            : "border-gray-300"
                                    }`}
                            >
                                <i
                                    className={`ri-check-double-fill text-xs sm:text-base ${booking?.status === "completed"
                                            ? "text-green-600"
                                            : booking?.status === "cancelled"
                                                ? "text-orange-500"
                                                : "text-gray-300"
                                        }`}
                                ></i>
                            </div>

                            <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                                Booking Completed
                            </h3>

                            <p
                                className={`text-xs sm:text-sm ${booking?.status === "pending"
                                        ? "text-gray-400"
                                        : booking?.status === "cancelled"
                                            ? "text-orange-500"
                                            : "text-green-600"
                                    }`}
                            >
                                Destination: {booking?.status}
                            </p>
                        </div>
                    </div>
                </div>

                {/* MAIN INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">

                    {/* SERVICE CARD */}
                    <div className="p-4 sm:p-5 rounded shadow-sm hover:shadow-md bg-gray-50 transition">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-hand-heart-line text-teal-600"></i>
                            Service Details
                        </h2>

                        <div className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                            <p><strong>Category:</strong> {booking?.service?.category}</p>
                            <p><strong>Price:</strong> ₹{booking?.service?.price}</p>
                            <p><strong>Duration:</strong> {booking?.service?.duration}</p>
                            <p><strong>Description:</strong> {booking?.service?.description}</p>
                            <p><strong>Working Date:</strong>{" "}
                                {new Date(booking?.details?.workingDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* PROVIDER CARD */}
                    <div className="p-4 sm:p-5 rounded shadow-sm hover:shadow-md bg-gray-50 transition">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-user-3-line text-teal-600"></i>
                            Provider Details
                        </h2>

                        <div className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                            <p><strong>Name:</strong> {booking?.provider?.fullName}</p>
                            <p><strong>Phone:</strong> {booking?.provider?.phone}</p>
                            <p><strong>Email:</strong> {booking?.provider?.email}</p>
                            <p>
                                <strong>Address:</strong>  
                                {booking?.provider?.address?.district},{" "}
                                {booking?.provider?.address?.state}
                            </p>
                        </div>
                    </div>

                    {/* BOOKING DETAILS */}
                    <div className="p-4 sm:p-5 rounded shadow-sm hover:shadow-md bg-gray-100 transition">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-drop-line text-teal-600"></i>
                            Booking Details
                        </h2>

                        <div className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                            <p><strong>Offer Payment:</strong> {booking?.details?.offerPayment || "NA"}</p>
                            <p><strong>Offer Duration:</strong> {booking?.details?.offerDuration || "NA"}</p>

                            <p>
                                <strong>Working Date:</strong>{" "}
                                {new Date(booking?.details?.workingDate).toLocaleDateString()}
                            </p>

                            <p><strong>Preferred Day:</strong> {booking?.details?.preferdDay}</p>

                            <p><strong>Notes:</strong> {booking?.details?.notes || "NA"}</p>
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-center mt-8 gap-3 flex-wrap">

                    {/* COMPLETED (DESKTOP) */}
                    {booking.status === "accepted" && (
                        <button className="px-5 py-2 hidden md:block bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                            Mark as Completed
                        </button>
                    )}

                    {/* COMPLETED (MOBILE ICON) */}
                    {booking.status === "accepted" && (
                        <button className="border rounded-full px-2 py-1 md:hidden bg-green-500 hover:bg-green-600 text-white font-bold">
                            <i className="ri-check-double-line"></i>
                        </button>
                    )}

                    {/* CANCEL (MOBILE ICON) */}
                    {booking.status !== "completed" && (
                        <button className="border rounded-full px-2 py-1 md:hidden bg-red-500 hover:bg-red-600 text-white font-bold">
                            <i className="ri-creative-commons-nd-line"></i>
                        </button>
                    )}

                    {/* CANCEL (DESKTOP) */}
                    {(booking.status !== "completed" && booking.status !== "cancelled") && (
                        <button onClick={(e)=>handleUserBookingUpdate(e,booking,{status:"cancelled"})} className="px-5 py-2 hidden md:block bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                            Cancel Booking
                        </button>
                    )}

                    {/* BOOK AGAIN */}
                    {["cancelled", "completed"].includes(booking?.status) && (
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg">
                            Book Again
                        </button>
                    )}

                    {/* SUPPORT */}
                    {["rejected", "accepted"].includes(booking?.status) && (
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg">
                            Contact Support
                        </button>
                    )}

                    {/* DELETE */}
                    {booking.status === "expired" || booking.status === "cancelled" && (
                        <button onClick={(e)=>handleUserBookingDelete(booking?._id)} className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition">
                            Delete
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserBookingView;
