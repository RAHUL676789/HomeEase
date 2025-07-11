import React, { useEffect } from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'

const PartnerProfile = () => {
  const partner = useSelector((state)=>state.partner.partner)
  const navigate = useNavigate();

  console.log(partner)

 useEffect(()=>{
   if(!partner){
    return navigate("/login")
  }
 },[])
  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
      <PartnerInfo partner = {partner} />
      <div className='max-w-2xl bg-gray-100 rounded-lg sm:ml-6 shadow-md shadow-gray-500 p-5'>
       <div className='flex w-full justify-between'>
         <h1 className='text-2xl font-bold 
        '>Service offered</h1>
        <div className='h-4 w-4 p-4 rounded-full border inline-flex justify-center items-center flex-col'>+</div>
       </div>
         {
          partner?.serivces?.length >= 0 ? partner?.serivces?.map((item,i)=>{
             <PartnerServiceCard serivces = {item}/>
          })
         :<h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}
        
      </div>
      <PartnerServiceModal/>
      
    </div>
  )
}

export default PartnerProfile
