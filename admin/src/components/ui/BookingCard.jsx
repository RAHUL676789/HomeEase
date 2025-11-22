import React, { useEffect,useState } from 'react'

const BookingCard = ({ item }) => {

    return (
        <div className='h-32 w-48 bg-[#ed5f12f4] hover:bg-orange-900 transition-all duration-300 rounded px-5 py-3'>
            <div className='h-12 w-12 rounded bg-orange-400 ml-auto '>

            </div>
            <div>
                <h3 className='text-xl font-semibold text-white'>{item.status}</h3>
                <h2 className='font-bold text-white text-3xl'>{item.count}</h2>
            </div>

        </div>
    )
}

export default BookingCard
