
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../layouts/Navbar"
import { Outlet, useNavigate } from "react-router-dom";
import NotLogin from "../ui/NotLogin";
import useAsyncWrap from "../../Utils/asyncWrap";
import getAdmin from "../../Utils/getAdmin";
import { useEffect } from "react";
import { setAdmin } from "../../redux/adminSlice";

export default function AdminLayout() {

  const admin  = useSelector((state) => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNaviget = (path)=>{
    navigate(path)
  }
  const asyncWrap = useAsyncWrap();

  const fetchaAdmin = async()=>{
    console.log("callign this funtion")
    const {data} = await asyncWrap(getAdmin);
    console.log(data)
    dispatch(setAdmin(data?.data?.data))
    
  }

  useEffect(()=>{
    fetchaAdmin()
  },[])

  console.log(admin)
  if (!admin?.isLoggedIn) {
    return <NotLogin handleNavigate={handleNaviget}/>
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* LEFT SIDEBAR/NAVBAR */}
      <div className="">
        <Navbar />
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="min-h-screen max-w-screen">
        <Outlet />

      </div>

    </div>
  );
}
