import React from "react";
import {useSelector} from "react-redux"
const UserProfile3 = () => {
  // const user = {
  //   name: "Amit Verma",
  //   email: "amitv@example.com",
  //   phone: "+91 9001234567",
  //   totalBookings: 12,
  //   bookings: [
  //     { id: 1, service: "Plumbing", date: "2025-10-28", status: "Completed" },
  //     { id: 2, service: "Home Painting", date: "2025-10-22", status: "Completed" },
  //     { id: 3, service: "Laundry", date: "2025-10-18", status: "Pending" },
  //   ],
  // };
const {user} = useSelector((state)=>state.user)
  

  return (
    <div className="max-w-4xl h-[90vh] max-h-[90vh] mx-auto mt-5 p-6 sm:p-8 bg-white rounded  shadow-md shadow-gray-500">
      {/* Responsive grid */}
      <div className="grid h-full grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Left section - Profile Info */}
        <div className="flex  flex-col items-center border-b md:border-b-0 md:border-r md:pr-6 pb-6 md:pb-0 h-[100%] ">
        <div className="h-12 w-12 border rounded-full flex justify-center items-center flex-col bg-gray-100">
           <i className="ri-user-3-line text-2xl "></i>
        </div>
          <h2 className="text-xl sm:text-2xl font-semibold mt-3 text-gray-800 text-center">
            {user?.fullName}
          </h2>
          <p className=" text-sm text-gray-400 sm:text-base text-center break-all">
            {user?.email}
          </p>
          <p className="text-green-500 text-sm sm:text-base">joined :{new Date(user?.createdAt).toLocaleDateString().toString().split("/").join("-")};
</p>
          <p className="mt-4 bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg text-sm sm:text-base">
            Total Bookings: {user?.bookings?.length}
          </p>
        </div>

        {/* Right section - Recent Bookings */}
        <div className="col-span-2">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 border-b pb-2 text-gray-800">
            Recent Bookings
          </h3>

          {/* Responsive Booking Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.bookings.map((b) => (
              <div
                key={b.id}
                className="border p-4 rounded-xl bg-gray-50 hover:shadow-md transition-all duration-200"
              >
                <p className="font-medium text-gray-800 text-base sm:text-lg">
                  {b.service}
                </p>
                <p className="text-sm text-gray-500 mt-1">{b.date}</p>
                <span
                  className={`text-xs sm:text-sm px-2 py-1 mt-2 inline-block rounded-full ${
                    b.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile3;
