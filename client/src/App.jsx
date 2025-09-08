import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css'
import Navbar from './Components/Other/Navbar'
import HeroSlider from "./Components/Hero/HeroSlider"
import BecomePartner from './Pages/BecomePartner'
// import PartnerProfile from './Pages/PartnerProfile'
import PartnerPublicProfile from './Pages/PublicProfile'
// import PartnerIndex from './Pages/PartnerProfile/PartnerIndex'
import Login from './Components/auth/login'
import Signup from './Components/auth/Signup'
import PartnerProfile from './Pages/PartnerProfile/PartnerProfile'
// import HeroSection from './Components/HeroSection'
import ServiceListing from "./Components/Service/ServiceListing"
function App() {
 
  return (
   <BrowserRouter>
     <Navbar/>
    
    
     <Routes>
        <Route path="/" element={<HeroSlider />} />

      <Route path="/partner" element={<BecomePartner/>}>

      </Route>

        <Route path="/partnerProfile" element={<PartnerProfile/>}>

      </Route>
       <Route path="/publicPartnerProfile" element={<PartnerPublicProfile/>}>

      </Route>
       <Route path="/login" element={<Login/>}>

      </Route>
        <Route path="/signup" element={<Signup/>}>

      </Route>
        <Route path="/services/:category" element={<ServiceListing/>}>

      </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
