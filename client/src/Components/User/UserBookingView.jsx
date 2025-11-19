import React from "react";

const UserBookingView = ({ booking, handleViewBooking,handleUserBookingUpdate }) => {
    //   const booking = {
    //     _id: "bk12345",
    //     status: "accepted", // try: "pending", "rejected", "completed", "cancelled", "expired"
    //     createdAt: "2025-10-29T10:00:00Z",
    //     details: {
    //       workingDate: "2025-11-03T00:00:00Z",
    //     },
    //     service: {
    //       title: "Plumbing Pipe Fix",
    //       category: "Plumbing",
    //       price: 450,
    //       duration: "1 hour",
    //       description: "Fixing leaking pipes and checking water flow system.",
    //     },
    //     provider: {
    //       fullName: "Rohit Sharma",
    //       phone: "+91 9876543210",
    //       email: "rohit@example.com",
    //       address: {
    //         district: "Bhopal",
    //         state: "Madhya Pradesh",
    //       },
    //     },
    //   };

    const getStatusColor = (status) => {
        const base =
            "px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1";

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
                <i className={`${iconMap[status]} text-base`}></i>
                {status}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 overflow-auto ">
            <div className="mx-auto h-[100vh] w-full md:w-[85%] bg-white overflow-auto p-6 relative rounded flex flex-col shadow-2xl border border-gray-200 animate-fadeIn ">
                <i onClick={() => handleViewBooking(null)} className="ri-close-line absolute right-7 top-0 hover:text-red-500 cursor-pointer"></i>
                {/* Header */}
                <div className="flex  justify-between items-center py-4  flex-wrap gap-3">

                    <p className="text-sm text-teal-500 mt-1">
                        Booking workingDate on:{" "}
                        {new Date(booking?.details?.workingDate).toLocaleDateString()}
                    </p>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {booking?.service?.title}
                    </h1>
                    {getStatusColor(booking?.status)}



                </div>

                <p className="text-sm text-gray-500 mt-1">
                    Booking created on:{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                </p>

                <div className="h-[1px] bg-gray-200 my-6"></div>

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

                {/* Main Info Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Service Details */}
                    <div className="p-5  rounded  shadow-sm hover:shadow-md hover:shadow-gray-400 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-hand-heart-line text-teal-600"></i>
                            Service Details
                        </h2>
                        <div className="space-y-1.5 text-sm text-gray-700">
                            <p>
                                <strong>Category:</strong> {booking.service.category}
                            </p>
                            <p>
                                <strong>Price:</strong> ₹{booking.service.price}
                            </p>
                            <p>
                                <strong>Duration:</strong> {booking.service.duration}
                            </p>
                            <p>
                                <strong>Description:</strong> {booking.service.description}
                            </p>
                            <p>
                                <strong>Working Date:</strong>{" "}
                                {new Date(
                                    booking.details.workingDate
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Provider Details */}
                    <div className="p-5 transition-all duration-200 hover:shadow-md hover:shadow-gray-400  rounded shadow-sm bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-user-3-line text-teal-600"></i>
                            Provider Details
                        </h2>
                        <div className="space-y-1.5 text-sm text-gray-700">
                            <p>
                                <strong>Name:</strong> {booking.provider.fullName}
                            </p>
                            <p>
                                <strong>Phone:</strong> {booking.provider.phone}
                            </p>
                            <p>
                                <strong>Email:</strong> {booking.provider.email}
                            </p>
                            <p>
                                <strong>Address:</strong>{" "}
                                {booking.provider.address.district},{" "}
                                {booking.provider.address.state}
                            </p>
                        </div>
                    </div>

                    <div className="p-5 transition-all duration-200  rounded shadow-sm hover:shadow-md hover:shadow-gray-400 bg-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <i className="ri-drop-line text-teal-600"></i>
                            Booking Details
                        </h2>
                        <div className="space-y-1.5 text-sm text-gray-700">
                            <p>
                                <strong>offerPayment:</strong> {booking?.details?.offerPayment || "NA"}
                            </p>
                            <p>
                                <strong>offerDuration:</strong> {booking?.details?.offerDuration || "NA"}
                            </p>
                            <p>
                                <strong>workingDate:</strong> {new Date(booking?.details?.workingDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>preferdDay:</strong>{" "}
                                {booking?.details?.preferdDay}
                            </p>
                              <p>
                                <strong>Additonal notes:</strong>{" "}
                                {booking?.details?.notes}
                            </p>
                        </div>
                    </div>
                </div>

              


                {/* Action Buttons */}
                <div className="flex justify-end mt-10 gap-3 flex-wrap">
                    {booking.status === "pending" && (
                        <button className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                            Cancel Booking
                        </button>
                    )}

                    {["cancelled", "completed"].includes(booking?.status) && (
                        <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-all">
                            Book Again
                        </button>
                    )}

                    {["rejected", "accepted"].includes(booking?.status) && (<button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-all">
                        Contact Support
                    </button>)}

                    {booking.status === "expired" && (
                        <button className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg     transition">
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserBookingView;
