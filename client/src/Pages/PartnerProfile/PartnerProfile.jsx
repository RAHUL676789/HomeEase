import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'
import { getMe } from '../../utils/auth/getMe'
import { addService, setPartner } from '../../redux/partnerSlice'
import Loader from '../../Components/Other/Loader'
import ToastContainer from '../../Components/Other/ToastContainer'
import axios from '../../utils/axios/axiosinstance'

const PartnerProfile = () => {
  const partner = useSelector((state) => state.partner.partner)
  const navigate = useNavigate();
  const [serviceModal, setserviceModal] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [ServiceCardOpen, setServiceCardOpen] = useState(null);

  const dispatch = useDispatch();

  console.log(partner?.services)

  const handleServiceModal = () => {
    setserviceModal((prev) => !prev)
  }



  useEffect(() => {
    if (!partner) {
      const fetchData = async () => {
        setisLoading(true)
        try {
          const data = await getMe();
          console.log(data);
          if(!data.data){
            return navigate("/login")
          }
          dispatch(setPartner(data?.data));
        } catch (error) {
          console.log(error);
          navigate("/login")
        }finally{
          setisLoading(false);
        }
      }
      fetchData();
    }
  }, [])

  const [Toast, setToast] = useState({
    type :"",
    content :"",
    trigger:Date.now(),
    status:false
  })


  const handleSetToast = (type,content)=>{
    const newToast = {
      type,
      content,
      trigger:Date.now(),
      status:true
    }
    setToast(newToast);

  }

  
  const handleAddService =async (data)=>{
       console.log(data)
       setisLoading(true);

       try {
        const response = await axios.post("/api/services",data);
        console.log(response);
        setserviceModal(false);
        handleSetToast("success",response?.data?.message || "service added ")
        dispatch(addService(response?.data?.data))
        
       } catch (error) {
        console.log(error)
        handleSetToast("error",error?.response?.data?.message || "someting went wrong")
       }finally{
        setisLoading(false);
       }
  }

  const handleServiceCardOpen  = (id)=>{
    console.log(id);
    if(id === ServiceCardOpen){
      setServiceCardOpen(null);
      return;
    }
    setServiceCardOpen(id);
  }
  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
     {isLoading && <Loader/>}
     {Toast.status && <ToastContainer trigger={Toast.trigger} key={Toast.trigger} type={Toast.type} content={Toast.content}/>}
      <PartnerInfo partner={partner} />
      <div className='max-w-2xl bg-gray-100 rounded-lg sm:ml-6 shadow-md shadow-gray-500 p-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl font-bold 
        '>Service offered</h1>
          <button title='add Services' onClick={handleServiceModal} className='h-4 w-4 p-4 rounded-full border cursor-pointer inline-flex justify-center items-center flex-col'><i className="ri-add-line"></i></button>
        </div>
        {
          partner?.services?.length > 0 ? partner?.services?.map((item, i) => (
            <PartnerServiceCard service={item} ServiceCardOpen={item._id === ServiceCardOpen} handleServiceCardOpen={handleServiceCardOpen} />
          ))
            : <h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}

      </div>
      {serviceModal && <PartnerServiceModal modal={handleServiceModal} handleAddService={handleAddService} />}

    </div>
  )
}

export default PartnerProfile
