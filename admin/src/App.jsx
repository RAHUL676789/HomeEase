import { useState } from 'react'
import Sidebar from './components/layouts/Sidebar'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AdminNavbar from './components/layouts/Navbar'
import AdminDashboard from './pages/dashboard/Dashboard'



function App() {
 

  return (
    <>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Sidebar/>}>

  </Route>
   <Route path='/navbar' element={<AdminDashboard/>}>

  </Route>
 </Routes>
 </BrowserRouter>
     
    </>
  )
}

export default App
