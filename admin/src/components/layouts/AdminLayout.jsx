
import Navbar from "../layouts/Navbar"
import { Outlet } from "react-router-dom";
export default function AdminLayout() {

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* LEFT SIDEBAR/NAVBAR */}
      <div className="">
        <Navbar/>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="min-h-screen max-w-screen">
        <Outlet/>
     
      </div>

    </div>
  );
}
