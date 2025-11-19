import React, { useState, useEffect, useRef } from 'react'
import HomeBack from "../../assets/HomePage.png"
import axios from '../../utils/axios/axiosinstance.js';
import Loader from "../../Components/Other/Loader.jsx"
import { useNavigate } from 'react-router-dom';

const HomeDash = () => {
  const [homeDashData, sethomeDashData] = useState(null);
  const [isLoading, setisLoading] = useState(true)
  const [animateValues, setanimateValues] = useState({
    totalBookings: 0,
    totalPartners: 0,
    completedBookings: 0
  });
 const navigate = useNavigate();
  useEffect(() => {

    const fetchHomeDashData = async (params) => {
      try {

        const { data } = await axios.get("/api/dash-home");
        console.log(data)
        sethomeDashData(data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setisLoading(false)
      }

    }
    fetchHomeDashData();
  }, [])

  const handleAnimateValue = (target, label, duration = 1000) => {
    let startTime = null;
    const startValue = animateValues[label] || 0;

    function animate(timeStamp) {
      if (!startTime) startTime = timeStamp;
      const progress = Math.min((timeStamp - startTime) / duration, 1);

      const newValue = Math.floor(startValue + (target - startValue) * progress);

      setanimateValues((prev) => ({
        ...prev,
        [label]: newValue,  // ✅ Dynamic key update
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (homeDashData?.quickActions) {
      homeDashData.quickActions.forEach(stat => {
        handleAnimateValue(stat[stat.label], stat.label, 500);
      });
    }
  }, [homeDashData]);



  if (isLoading) {
    return <Loader />
  }


  return (
    <div
      className="h-screen w-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${HomeBack})` }}>
      <div className="h-full w-full overflow-scroll no-scrollbar bg-white/20 flex flex-col p-8 gap-8">



        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl text-gradient font-serif font-extrabold mb-2 tracking-wide drop-shadow-lg">
              Welcome, To HomeEase!
            </h1>
            <p className="text-lg text-teal-600 font-bold opacity-90 drop-shadow-sm">
              Manage your Orders and Books Services.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-2">
            <button className="bg-teal-500 text-sm hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded shadow-lg transition transform hover:scale-105">
              view Services
            </button>

          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeDashData?.quickActions?.map((stat) => (
            <div
              key={stat?.label}
              className={`bg-gradient-to-r from-gray-400 to-teal-600 rounded p-6 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300`}
            >
              <h2 className="text-3xl font-bold text-white drop-shadow">{animateValues[stat.label]}+</h2>
              <p className="text-white/90 text-lg">{stat?.label || "hello from home"}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-teal-600 text-2xl font-semibold mb-4 drop-shadow">Recent Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            { homeDashData?.recentBookings.length > 0 ? homeDashData?.recentBookings.map((booking) => (
              <div
                key={booking?._id}
                className="bg-gradient-to-br relative bg-gray-200/20 text-black  rounded  shadow-md shadow-gray-600 hover:scale-105 transition-transform z-50 duration-300 flex flex-col gap-0 px- py-2"
              >
             
                <p className="  text-xs absolute px-1 left-2 shadow rounded  ">{new Date(booking?.createdAt).toLocaleDateString()}</p>

                   <h4 className="text-sm text-center drop-shadow">{booking?.service?.category}</h4>
                <span
                  className={`inline-block px-3 absolute right-2 rounded text-xs font-semibold ${booking?.status === "accepted"
                    ? " text-teal-600"
                    : " text-red-700"
                    }`}
                >
                  {booking?.status}
                </span>
                {/* Inline action button for booking */}
                <button onClick={()=>navigate("/services",{state:{category:booking?.service?.category}})} className="mt-3 border text-sm border-teal-400 font-semibold px-4 py-2 rounded shadow hover:bg-teal-700 hover:text-white mx-2 ">
                  Book Now
                </button>
              </div>
            )): <div><h2 className='text-xl font-black'>No Booking Found</h2> </div>}
          </div>
        </div>
      </div>


    </div>
  )
}

export default HomeDash
