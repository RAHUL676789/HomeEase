import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from './utils/auth/getMe'
import { setPartner } from './redux/partnerSlice'
import { setUser } from './redux/userSlice'

import './App.css'
import Navbar from './Components/Other/Navbar'
import BecomePartner from './Pages/BecomePartner'
import PartnerPublicProfile from './Pages/PublicProfile'
import Login from './Components/auth/login'
import Signup from './Components/auth/Signup'
import PartnerProfile from './Pages/PartnerProfile/PartnerProfile'
import ServiceListing from "./Components/Service/ServiceListing"
import ErrorBoundary from './Components/Other/ErrorBoundary'
import PartnerBookings from './Pages/PartnerProfile/PartnerBookings'
import ToastContainer from './Components/Other/ToastContainer'
import PartnerHome from './Components/Parterner/PartnerHome'
import Home from './Pages/Home/Home'
import UserProfile from './Pages/User/UserProfile'
import Loader from './Components/Other/Loader'

function App() {
  const dispatch = useDispatch()
  const {toast} = useSelector((state)=>state.toast)
  const {isLoading} = useSelector((state)=>state.loader);

  useEffect(() => {
    async function auth() {
      try {
        const response = await getMe()
        console.log("Auth response:", response)

        if (response?.data) {
          if (response?.data?.role === "partner") {
            dispatch(setPartner(response?.data?.data))
          } else if (response?.data?.role === "user") {
            dispatch(setUser(response?.data?.data))
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }

    auth()
  }, [dispatch])

  return (
    <BrowserRouter>
      <ErrorBoundary>
        {isLoading && <Loader/>}
        <Navbar />
        {toast && toast.status && <ToastContainer type={toast.type} content={toast.content} trigger={toast.trigger} key={toast.trigger}/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partner" element={<BecomePartner />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/partnerProfile" element={<PartnerProfile />} />
          <Route path="/publicPartnerProfile" element={<PartnerPublicProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServiceListing />} />
          <Route path="/:id/Bookings" element={<PartnerBookings />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
