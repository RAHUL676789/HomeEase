import React, { useEffect,useState } from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'

const PartnerProfile = () => {
  const partner = useSelector((state)=>state.partner.partner)
  const navigate = useNavigate();
  const [serviceModal, setserviceModal] = useState(false)

  console.log(partner?.services)

  const handleServiceModal = ()=>{
    setserviceModal((prev)=>!prev)
  }

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
        <button title='add Services' onClick={handleServiceModal} className='h-4 w-4 p-4 rounded-full border cursor-pointer inline-flex justify-center items-center flex-col'><i className="ri-add-line"></i></button>
       </div>
         {
          partner?.services?.length > 0 ? partner?.services?.map((item,i)=>(
             <PartnerServiceCard service = {item}/>
          ))
         :<h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}
        
      </div>
     {serviceModal &&  <PartnerServiceModal modal = {handleServiceModal} /> }
      
    </div>
  )
}

export default PartnerProfile
