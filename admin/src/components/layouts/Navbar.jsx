import React, { useEffect, useState } from 'react'
import AdminChartsDemo from '../charts/AdminChart.jsx';

const Navbar = () => {
  const [isNavOpen, setisNavOpen] = useState(false);
  const [isSidebarOpen, setisSidebarOpen] = useState(false)

  const liClass = `flex px-5  gap-3 py-2 rounded hover:bg-gray-700 transition-all duration-300 cursor-pointer w-full text-center `
  const liNavclass = "flex px-5  gap-3 py-2 rounded hover:bg-gray-700 transition-all duration-300 cursor-pointer w-full justify-center items-center align-start"

  useEffect(() => {
    const handleSideOpe = () => {
      if (isSidebarOpen) {
        setisSidebarOpen(false)
      }
    }
    window.addEventListener("click", handleSideOpe)
  }, [isSidebarOpen])

  const handleLiClikc = (e) => {
    e.stopPropagation();
    setisSidebarOpen(prev => !prev)
  }

  return (
    <div >
      {/* mobile navbar /destop type*/}
      <nav className='h-18  md:hidden w-screen bg-gray-900 flex items-center justify-between px-5 py-1 relative '>

        <h2 className='text-white cursor-pointer  border rounded-full h-8 w-8 flex justify-center items-center flex-col'><i className='ri-user-line'></i></h2>
        <button onClick={() => setisNavOpen(true)}>
          <i className='ri-menu-line text-white'></i>
        </button>

        <div className={`absolute py-3 border w-full top-0 left-0 z-50 bg-gray-900 ${isNavOpen ? "translate-y-0" : "-translate-y-full"} transition-all duration-400`}>
          <button onClick={() => setisNavOpen(false)}><i className='ri-close-line text-white absolute right-5 top-0 text-lg'></i></button>
          <ul className={`flex flex-col gap-5 px-5 text-white `}>

            {["DashBoard", "Users", "Partners", "Services", "Bookings", "Settings", ].map((item, i) => (
              <li key={i + Math.random() * Math.random()} className={liNavclass}>{item}</li>
            ))}


          </ul>
        </div>


      </nav>

      <nav className={`hidden md:block ${isSidebarOpen ? "w-64" : "w-16 overflow-hidden text-left"} h-screen bg-gray-900 transition-all duration-300`}>
        <h2 className='text-whitemx-auto  flex gap-3 cursor-pointer justify-center items-center text-center text-xl font-semibold  py-2'> <button className=' border h-8 w-8 rounded-full text-white'>
          <i className="ri-user-line"></i>
        </button>
         <span className={`${isSidebarOpen ? "block" : "hidden"} text-white`}>Admin</span>
         </h2>

        <div className='mt-2 border border-t-white'>
          <ul className={`flex flex-col gap-5 overflow-scroll no-scrollbar px-1 text-white `}>

            {
              [{ itemName: "DashBoard", icon: "ri-dashboard-line" }, { itemName: "Users", icon: "ri-group-2-fill" }, { itemName: "Partners", icon: "ri-atom-line" }, { itemName: "Services", icon: "ri-service-line" }, { itemName: "Bookings", icon: "ri-shopping-bag-fill" }, { itemName: "Settings", icon: "ri-settings-2-line" }].map((item, i) => (
                <li onClick={handleLiClikc} key={item.itemName + item.icon} className={liClass}> <i className={item.icon}></i><span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  {item.itemName}</span></li>
              ))
            }



          </ul>
        </div>

      </nav>



    </div>
  )
}

export default Navbar
