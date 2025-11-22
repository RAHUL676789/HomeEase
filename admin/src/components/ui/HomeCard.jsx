import React, { useState, useEffect } from 'react'

const HomeCard = ({ item }) => {

    const [value, setvalue] = useState(item.total || 0)

    useEffect(() => {
        if(item.name === "Revenues")return;
        let start = 0;
        let end = Number(item.total);
        let duration = 500;
        let startTime = null;
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const newValue = Math.floor(progress * end);

            setvalue(newValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [item.total]);

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
                <h2 className='font-bold text-white text-3xl'>{value}</h2>
            </div>

        </div>
    )
}

export default HomeCard
