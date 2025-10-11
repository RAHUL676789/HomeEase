import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../utils/auth/getMe";
import { setPartner } from "../../redux/partnerSlice"
import { setUser } from "../../redux/userSlice"
import { socket } from "../../socket/socket";

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const dispatch = useDispatch();



  const partner = useSelector((state) => state.partner?.partner);
  const user = useSelector((state) => state.user?.user);

  console.log(partner)
  console.log(user)
  const navRef = useRef();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shownav, setShownav] = useState(false);

  const NavLinkClass =
    "relative mb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0  hover:after:w-full after:transition-all after:duration-300";

  const navItems = [
    { name: "Home", path: "/", icon: <i className="ri-home-8-fill mr-1"></i> },
    { name: "About", path: "/about", icon: <i className="ri-gitlab-fill mr-1"></i> },
    { name: "Contact", path: "/contact", icon: <i className="ri-mail-line mr-1"></i> },


  ];

  // ---------------- LOGIN STATES ----------------
  const guestActions = [
    { name: "Become a Partner", path: "/partner", icon: <i className="ri-medal-line text-fuchsia-500"></i> },
   
    { name: "Login", path: "/login", icon: <i className="ri-login-circle-line text-green-600 rotate-90"></i> },
     { name: "Signup", path: "/signup", icon: <i className="ri-logout-circle-line text-green-500 rotate-90"></i> },
  ];

  const userActions = [
    {
      name: `Hi ${user?.fullName}`,
      path: "/userProfile",
      icon: <i className="ri-user-3-fill text-teal-400"></i>,
    },

    { name: "My-Orders", path: "/MyOrders", icon: <i className="ri-service-fill mr-1"></i> },
    { name: "Logout", path: "/logout", icon: <i className="ri-logout-circle-line text-red-600"></i> },
  ];

  const partnerActions = [
    {
      name: `Hi ${partner?.fullName}`,
      path: "/partnerProfile",
      icon: <i className="ri-user-star-fill text-yellow-500"></i>,
    },
  
    { name: "Booking", path: `/${partner?._id}/Bookings`, icon: <i className="ri-service-fill mr-1"></i> },
      { name: "Logout", path: "/logout", icon: <i className="ri-logout-circle-line text-red-600"></i> },
  ];

  // Select which menu to show
  const actionItems = user
    ? userActions
    : partner
      ? partnerActions
      : guestActions;

  // ---------------- SCROLL HIDE LOGIC ----------------
  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShownav(true);
      } else {
        setShownav(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  }, [lastScrollY]);


  // ---------------- RETURN JSX ----------------
  return (
    <div
      ref={navRef}
      className={`${shownav ? "-translate-y-full" : "translate-y-0"
        } sticky w-full shadow-sm top-0 z-50 shadow-gray-500 h-16 px-4 py-2 bg-white text-gray-800 max-w-screen flex justify-between items-center transition-transform duration-300`}
    >
      <h2 className="text-2xl font-bold text-teal-800 cursor-pointer transition-all duration-500 mr-5">
        HomeEase
      </h2>

      {/* Desktop Nav */}
      <div className="options hidden md:flex px-5 flex-grow gap-10 font-medium justify-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${NavLinkClass} ${isActive ? "text-pink-700 after:bg-pink-700" : "text-teal-800 after:bg-teal-600"}`
            }
          >
            <span className="mr-1">{item.icon}</span> {item.name}
          </NavLink>
        ))}

         {!partner && <NavLink key={"Services"} to={"/services"} onClick={() => setIsMobileOpen(true)}  className={({ isActive }) =>
            `${NavLinkClass} ${isActive ? "text-pink-700 after:bg-pink-700 " : "text-teal-800 after:bg-teal-800 "}`
          }>
            <span> <i className="ri-tools-line "></i> </span> Services
          </NavLink>}
      </div>

      {/* Desktop Buttons */}
      <div className="ml-5 hidden md:flex gap-5">
        {actionItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            onClick={() => setIsMobileOpen(true)}
            className={({isActive})=>`font-light text-sm  px-2 py-2 cursor-pointer flex items-center gap-1 ${isActive ? "border-2 text-pink-700 font-bold border-teal-600" : ""}`}
          >
            {item.icon} {item.name}
          </NavLink>
        ))}
        
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <i
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="ri-menu-3-fill cursor-pointer"
        ></i>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col py-2 bg-white w-screen absolute left-0 top-0 ${isMobileOpen ? "-translate-y-full" : "translate-y-0"
          } transition-all duration-300`}
      >
        <div className="relative flex flex-grow flex-col items-center gap-6 font-medium justify-center">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="absolute right-5 top-0 active:translate-y-0.5 active:text-red-800 cursor-pointer"
          >
            <i className="ri-close-line text-lg"></i>
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(true)}
              className={({ isActive }) =>
                `${NavLinkClass} ${isActive ? "text-pink-700 after:bg-pink-700" : "text-teal-800 after:bg-teal-800"}`
              }
            >
              <span className="mr-1">{item.icon}</span> {item.name}
            </NavLink>
          ))}

          {!partner && <NavLink key={"Services"} to={"/services"} onClick={() => setIsMobileOpen(true)}  className={({ isActive }) =>
            `${NavLinkClass} ${isActive ? "text-pink-700 after:bg-pink-700 " : "text-teal-800 after:bg-teal-800 "}`
          }>
            <span> <i className="ri-tools-line "></i> </span> Services
          </NavLink>}

        </div>

        <div className="ml-5 items-center flex flex-col gap-2 mt-3">
          {actionItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              onClick={() => setIsMobileOpen(true)}
              className={({isActive})=> `font-light w-fit text-sm hover:border border-green-500 px-2 py-2 cursor-pointer active:translate-y-4 flex items-center gap-1 ${isActive ? "border-teal-600" : ""}`}
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
