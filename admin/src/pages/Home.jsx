import React, { useState } from 'react'
import HomeCard from '../components/ui/HomeCard'
import BookingCard from '../components/ui/BookingCard'

const Home = () => {
    const cardData = [{ name: "User", total: 2354 }, { name: "Partner", total: 276 }, { name: "Services", total: 453 }, { name: "Bookings", total: 477 },{name:"Revenue",total:"₹4.8L"}]

    const bookingData = [{ status: "Pending", count: 458 }, { status: "Accepted", count: 768 }, { status: "Rejected", count: 3 }, { status: "Completed", count: 899 }, { status: "Cancelled", count: 34 }]

    return (
        <div className=' overflow-scroll h-screen max-w-screen bg-gray-950  gap-5  '>
            <h1 className='text-white font-bold text-4xl px-7 py-2 '>Admin Home</h1>

            <div className='flex flex-wrap gap-4 px-7 py-9 max-w-screen'>
                {cardData.map((item, i) => (
                    <HomeCard item={item} />
                ))}
            </div>

            <div>
                <h3 className='text-white font-semibold text-xl px-5'>Recents Bookings </h3>
                <div className='w-full flex flex-wrap gap-5 px-7 py-5'>
                    {bookingData.map((item, i) => (
                        <div>
                            <BookingCard item={item} />
                        </div>
                    ))}
                </div>

            </div>

       



        </div>
    )
}

export default Home
