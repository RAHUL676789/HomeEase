import { useState } from "react";
import 'remixicon/fonts/remixicon.css'



function Navbar() {

    const [isMobileOpen, setIsMobileOpen] = useState(true);
    const [active, setactive] = useState("Home")
    let NavLinkClass = "relative mb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600  hover:after:w-full after:transition-all after:duration-300 "

    return (
        <div className="sticky   shadow-sm top-0 z-50 shadow-gray-500 h-16 px-4 py-2 bg-white text-gray-800 max-w-screen flex justify-between items-center">
            <h2 className="text-2xl font-bold text-teal-800 cursor-pointer mr-5">HomeEase</h2>
            <div className="options hidden md:flex px-5 flex-grow  gap-10 font-medium justify-center">
                {[
                    { itemName: "Home", itemIcon: <i className={`ri-home-8-fill  mr-1 `}></i> },
                    { itemName: "About", itemIcon: <i className="ri-gitlab-fill  mr-1"></i> },
                    { itemName: "Contact", itemIcon: <i className="ri-mail-line  mr-1"></i> },
                    { itemName: "Service", itemIcon: <i className="ri-service-fill  mr-1"></i> }].map((item, i) => (
                        <a  onClick={()=>setactive(item.itemName)} key={item.itemName} href="#" className={`${NavLinkClass} ${active === item.itemName ? "text-pink-700" :""}`}><span className={`${active == item.itemName ? "text-pink-700  " :"text-teal-800"}`} >{item.itemIcon}</span>{item.itemName}</a>
                    ))}
            </div>
            <div className="other ml-5 hidden   md:flex gap-5">
                {[{ itemName: "Become a partner", itemIcon: <i className="ri-medal-line text-fuchsia-500"></i> }, { itemName: "Login", itemIcon: <i className="ri-login-circle-line text-green-600"></i> }].map((item, i) => (
                    <button key={item.itemName} className="font-light text-sm hover:border border-green-500 px-2 py-2 cursor-pointer"><span>{item.itemIcon}</span>{item.itemName}</button>
                ))}
            </div>
            <div className="md:hidden ">
                <i  onClick={()=>setIsMobileOpen((prev)=>!prev)} className="ri-menu-3-fill cursor-pointer"></i>
            </div>

            <div className={`md:hidden flex flex-col py-2 bg-white  w-screen absolute left-0 top-0 ${isMobileOpen ? "-translate-y-full" :"translate-y-0"} transition-all duration-300`}>
                <div className="options relative flex  flex-grow  gap-10 font-medium justify-center flex-col items-center ">
                      <button onClick={()=>setIsMobileOpen((prev)=>!prev)} className="absolute right-5 top-0 active:translate-y-0.5 active:text-red-800 cursor-pointer">
                    <i className="ri-close-line text-lg"></i>
                    </button>
                    {[
                        { itemName: "Home", itemIcon: <i className="ri-home-8-fill text-teal-800 mr-1 "></i> },
                        { itemName: "About", itemIcon: <i className="ri-gitlab-fill text-teal-800 mr-1"></i> },
                        { itemName: "Contact", itemIcon: <i className="ri-mail-line text-teal-800 mr-1"></i> },
                        { itemName: "Service", itemIcon: <i className="ri-service-fill text-teal-800 mr-1"></i> }].map((item, i) => (
                            <a onClick={()=>(setactive(item.itemName),setIsMobileOpen((prev)=>!prev))} href="#" key={item.itemName} className={NavLinkClass}><span>{item.itemIcon}</span>{item.itemName}</a>
                        ))}
                </div>
                <div className="other ml-5    items-center  flex flex-col gap-1">
                  
                    {[ { itemName: "Login", itemIcon: <i className="ri-login-circle-line text-green-600"></i> },{ itemName: "Become a partner", itemIcon: <i className="ri-medal-line text-fuchsia-500"></i> }].map((item, i) => (
                        <button key={item.itemName} className="font-light w-fit text-sm hover:border border-green-500 px-2 py-2 cursor-pointer active:translate-y-4"><span>{item.itemIcon}</span>{item.itemName}</button>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Navbar;