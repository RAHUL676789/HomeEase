import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css'
import Navbar from './Components/Other/Navbar'
import HeroSlider from "./Components/Hero/HeroSlider"
import BecomePartner from './Pages/BecomePartner'
import PartnerProfile from './Pages/PartnerProfile'
import PartnerPublicProfile from './Pages/PublicProfile'
// import HeroSection from './Components/HeroSection'

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
     </Routes>
   </BrowserRouter>
  )
}

export default App
