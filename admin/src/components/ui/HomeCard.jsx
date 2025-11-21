import React, { useState } from 'react'

const HomeCard = ({ item }) => {
    const uiClass = {
        User: "bg-orange-600",
        Partner: "bg-green-500",
        Services: "bg-gray-200",
        Bookings: "bg-[#ed5f12f4]"
    }


    return (
        <div className='w-64  h-36 bg-gray-600 hover:bg-gray-700 transition-all duration-300 rounded shadow shadow-gray-500 px-5 py-2'>

            <div className={`${uiClass[item.name]} w-12 h-12 ml-auto rounded`}>

            </div>
            <div>
                <h3 className='text-xl font-semibold text-white'>{item.name}</h3>
                <h2 className='font-bold text-white text-3xl'>{item.total}</h2>
            </div>

        </div>
    )
}

export default HomeCard
