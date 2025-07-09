import React from 'react'
import {useSelector} from "react-redux"
import PartnerInfo from './PartnerInfo'
import PartnerServiceCard from './PartnerServiceCard'

const PartnerProfile = () => {
  const partner = useSelector((state)=>state.partner.partner)
  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
      <PartnerInfo partner = {partner} />
      <PartnerServiceCard/>
      
    </div>
  )
}

export default PartnerProfile
