import React from 'react'
import {useSelector} from "react-redux"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'

const PartnerProfile = () => {
  const partner = useSelector((state)=>state.partner.partner)
  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
      <PartnerInfo partner = {partner} />
      <div className='max-w-2xl  rounded-lg sm:ml-6 shadow-md shadow-gray-500 p-5'>
        <h1 className='text-2xl font-bold 
        '>Service offered</h1>
        <PartnerServiceCard/>
      </div>
      
    </div>
  )
}

export default PartnerProfile
