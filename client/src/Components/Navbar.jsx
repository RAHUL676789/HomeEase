import { useState } from "react";
import 'remixicon/fonts/remixicon.css'



function Navbar() {

    let NavLinkClass = "relative mb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600  hover:after:w-full after:transition-all after:duration-300 "

    return (
        <div className="sticky   shadow-sm top-0 z-50 shadow-gray-500 h-16 px-4 py-2 bg-white text-gray-800 max-w-screen flex justify-between items-center">
            <h2 className="text-2xl font-bold text-teal-800 cursor-pointer mr-5">HomeEase</h2>
            <div className="options hidden md:flex px-5 flex-grow  gap-10 font-medium justify-center">
                {[
                    { itemName: "Home", itemIcon: <i className="ri-home-8-fill text-teal-800 mr-1 "></i> },
                    { itemName: "About", itemIcon: <i class="ri-gitlab-fill text-teal-800 mr-1"></i> },
                    { itemName: "Contact", itemIcon: <i class="ri-mail-line text-teal-800 mr-1"></i> },
                    { itemName: "Service", itemIcon: <i class="ri-service-fill text-teal-800 mr-1"></i> }].map((item, i) => (
                        <a href="#" className={NavLinkClass}><span>{item.itemIcon}</span>{item.itemName}</a>
                    ))}
            </div>
            <div className="other ml-5 hidden   md:flex gap-5">
                {[{ itemName: "Become a partner", itemIcon: <i class="ri-medal-line text-fuchsia-500"></i> }, { itemName: "Login", itemIcon: <i class="ri-login-circle-line text-green-600"></i> }].map((item, i) => (
                    <button className="font-light text-sm hover:border border-green-500 px-2 py-2 cursor-pointer"><span>{item.itemIcon}</span>{item.itemName}</button>
                ))}
            </div>

            <div className=" flex flex-col py-2 bg-white -200 w-screen absolute left-0 top-0">
                <div className="options hidden md:flex  flex-grow  gap-10 font-medium justify-center flex-col items-center">
                    {[
                        { itemName: "Home", itemIcon: <i className="ri-home-8-fill text-teal-800 mr-1 "></i> },
                        { itemName: "About", itemIcon: <i class="ri-gitlab-fill text-teal-800 mr-1"></i> },
                        { itemName: "Contact", itemIcon: <i class="ri-mail-line text-teal-800 mr-1"></i> },
                        { itemName: "Service", itemIcon: <i class="ri-service-fill text-teal-800 mr-1"></i> }].map((item, i) => (
                            <a href="#" className={NavLinkClass}><span>{item.itemIcon}</span>{item.itemName}</a>
                        ))}
                </div>
                <div className="other ml-5 hidden   items-center  md:flex flex-col gap-1">
                    {[ { itemName: "Login", itemIcon: <i class="ri-login-circle-line text-green-600"></i> },{ itemName: "Become a partner", itemIcon: <i class="ri-medal-line text-fuchsia-500"></i> }].map((item, i) => (
                        <button className="font-light w-fit text-sm hover:border border-green-500 px-2 py-2 cursor-pointer"><span>{item.itemIcon}</span>{item.itemName}</button>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Navbar;