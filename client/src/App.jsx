import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import './App.css'
import Navbar from './Components/Navbar'
import HeroSlider from "./Components/Hero/HeroSlider"
import BecomePartner from './Pages/BecomePartner'
// import HeroSection from './Components/HeroSection'

function App() {
 
  return (
   <BrowserRouter>
     <Navbar/>
    
     <Routes>
        <Route path="/" element={<HeroSlider />} />

      <Route path="/partner" element={<BecomePartner/>}>

      </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
