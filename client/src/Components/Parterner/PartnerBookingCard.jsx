import React, { useRef } from 'react';

const PartnerBookingCard = ({ booking,hadleBookingOptionOpen,BookingCardOptionOpen }) => {
  const { user, service, status, date } = booking;
  const offerRef = useRef(null)
  const chatRef = useRef(null)

  return (
    <div className="m-3 p-4 shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-3 border-gray-300">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {user?.fullName
              ? user.fullName
                .split(" ")
                .map(n => n[0])
                .join("")
                .toUpperCase()
              : "NA"}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user?.fullName || "Unknown User"}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Booking Status */}
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${status === "pending"
                ? "bg-yellow-500"
                : status === "completed"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
          >
            {status || "Pending"}
          </span>
          <p className="text-gray-500 text-sm">{new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Service Info */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800 text-lg">{service?.title}</h3>
        <p className="text-gray-600 text-sm">{service?.description}</p>
        <div className="flex justify-between mt-2">
          <p className="text-gray-700 font-medium">Price: ₹{service?.price}</p>
          <p className="text-gray-700 font-medium">
            Category: {service?.category || "General"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className='flex justify-between flex-col rounded-lg py-3 px-2 shadow shadow-gray-400 mb-3'>
         <div className='flex justify-between'>
            <h3 className='font-semibold text-lg'>View-Offers</h3>
          <i onClick={()=>hadleBookingOptionOpen(`${booking._id}:offer`)} className={`ri-arrow-down-s-line ${BookingCardOptionOpen === `${booking._id}:offer`? "rotate-180":"rotate-0" } transition-all duration-150`}></i>
         </div>
          <div ref={offerRef} style={
            {maxHeight:BookingCardOptionOpen === `${booking._id}:offer` ? offerRef.current.scrollHeight+"px" : "0px"}
            } className=' overflow-hidden duration-300'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt sed assumenda repellat beatae natus minima qui quam eius, minus ad. Rerum earum error atque! Distinctio eaque delectus cupiditate quam repellendus!
          </div>
        </div>
        <div className='flex justify-between  flex-col rounded-lg py-3 px-2 shadow shadow-gray-400 mb-3'>
        <div className='flex justify-between'>
            <h3 className='text-lg font-semibold'>Chats</h3>
          <i onClick={()=>hadleBookingOptionOpen(`${booking._id}:chat`)}  className={`ri-arrow-down-s-line ${BookingCardOptionOpen === `${booking._id}:chat`? "rotate-180":"rotate-0" } transition-all duration-150`}></i>
        </div>
          <div style={
            {maxHeight:BookingCardOptionOpen === `${booking._id}:chat` ? offerRef.current.scrollHeight+"px" : "0px"}
            } className='max-h-0 overflow-hidden transition-all scroll-smooth duration-300'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quibusdam qui quis illo repellat dolores sit nostrum ducimus amet aspernatur eligendi exercitationem nam, voluptatum vitae. Sunt iste nobis dignissimos ipsum?
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerBookingCard;
