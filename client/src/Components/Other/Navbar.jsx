import { useState } from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const [active, setActive] = useState("Home");

  const NavLinkClass = "relative mb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-teal-600 hover:after:w-full after:transition-all after:duration-300";

  const navItems = [
    { name: "Home", icon: <i className="ri-home-8-fill mr-1"></i> },
    { name: "About", icon: <i className="ri-gitlab-fill mr-1"></i> },
    { name: "Contact", icon: <i className="ri-mail-line mr-1"></i> },
    { name: "Service", icon: <i className="ri-service-fill mr-1"></i> },
  ];

  const actionItems = [
    { name: "Become a partner", path: "/partner", icon: <i className="ri-medal-line text-fuchsia-500"></i> },
    { name: "Login", path: "/login", icon: <i className="ri-login-circle-line text-green-600"></i> },
  ];

  return (
    <div className="sticky shadow-sm top-0 z-50 shadow-gray-500 h-16 px-4 py-2 bg-white text-gray-800 max-w-screen flex justify-between items-center">
      <h2 className="text-2xl font-bold text-teal-800 cursor-pointer mr-5">HomeEase</h2>

      {/* Desktop Nav */}
      <div className="options hidden md:flex px-5 flex-grow gap-10 font-medium justify-center">
        {navItems.map((item) => (
          <a
            key={item.name}
            onClick={() => setActive(item.name)}
            href="#"
            className={`${NavLinkClass} ${active === item.name ? "text-pink-700" : ""}`}
          >
            <span className={`${active === item.name ? "text-pink-700" : "text-teal-800"}`}>
              {item.icon}
            </span>
            {item.name}
          </a>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="other ml-5 hidden md:flex gap-5">
        {actionItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            onClick={()=>setIsMobileOpen((prev)=>!prev)}
            className="font-light text-sm hover:border border-green-500 px-2 py-2 cursor-pointer"
          >
            <span>{item.icon}</span> {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <i onClick={() => setIsMobileOpen((prev) => !prev)} className="ri-menu-3-fill cursor-pointer"></i>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden flex flex-col py-2 bg-white w-screen absolute left-0 top-0 ${isMobileOpen ? "-translate-y-full" : "translate-y-0"} transition-all duration-300`}>
        <div className="options relative flex flex-grow gap-10 font-medium justify-center flex-col items-center">
          <button onClick={() => setIsMobileOpen((prev) => !prev)} className="absolute right-5 top-0 active:translate-y-0.5 active:text-red-800 cursor-pointer">
            <i className="ri-close-line text-lg"></i>
          </button>

          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => {
                setActive(item.name);
                setIsMobileOpen(true);
              }}
              href="#"
              className={NavLinkClass}
            >
              <span>{item.icon}</span> {item.name}
            </a>
          ))}
        </div>

        <div className="other ml-5 items-center flex flex-col gap-1">
          {actionItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={() => setIsMobileOpen(true)}
              className="font-light w-fit text-sm hover:border border-green-500 px-2 py-2 cursor-pointer active:translate-y-4"
            >
              <span>{item.icon}</span> {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
