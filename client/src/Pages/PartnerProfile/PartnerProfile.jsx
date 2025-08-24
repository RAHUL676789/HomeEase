import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'
import { getMe } from '../../utils/auth/getMe'
import { addService, setPartner,updateService } from '../../redux/partnerSlice'
import Loader from '../../Components/Other/Loader'
import ToastContainer from '../../Components/Other/ToastContainer'
import axios from '../../utils/axios/axiosinstance'
import ServiceGallery from '../../Components/Parterner/ServiceGallery'
import { uploadFile } from '../../utils/cloudinary/uploadFile'

const PartnerProfile = () => {
  const partner = useSelector((state) => state.partner.partner)
  const navigate = useNavigate();
  const [serviceModal, setserviceModal] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [ServiceCardOpen, setServiceCardOpen] = useState(null);
  const [ShowGalleryModal, setShowGalleryModal] = useState(false);
  const [GalleryFiles, setGalleryFiles] = useState([]);
  const [previewUrls, setpreviewUrls] = useState([]);
  const [Urls, setUrls] = useState([]);
  const [serviceId, setserviceId] = useState(null);
  const dispatch = useDispatch();


  const handleSeriveId = (id) => {
    console.log("this is service id",id)
    setserviceId(id);
  }


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
          if (!data.data) {
            return navigate("/login")
          }
          dispatch(setPartner(data?.data));
        } catch (error) {
          console.log(error);
          navigate("/login")
        } finally {
          setisLoading(false);
        }
      }
      fetchData();
    }
  }, [])

  const [Toast, setToast] = useState({
    type: "",
    content: "",
    trigger: Date.now(),
    status: false
  })


  const handleSetToast = (type, content) => {
    const newToast = {
      type,
      content,
      trigger: Date.now(),
      status: true
    }
    setToast(newToast);

  }


  const handleAddService = async (data) => {
    console.log(data)
    setisLoading(true);

    try {
      const response = await axios.post("/api/services", data);
      console.log(response);
      setserviceModal(false);
      handleSetToast("success", response?.data?.message || "service added ")
      dispatch(addService(response?.data?.data))

    } catch (error) {
      console.log(error)
      handleSetToast("error", error?.response?.data?.message || "someting went wrong")
    } finally {
      setisLoading(false);
    }
  }

  const handleServiceCardOpen = (id) => {
    console.log(id);
    if (id === ServiceCardOpen) {
      setServiceCardOpen(null);
      return;
    }
    setServiceCardOpen(id);
  }

  const handleShowGalleryModal = (files) => {
    console.log(files)

    const previeFiles = Array.from(files);
    setGalleryFiles(previeFiles);
    const galleryPreview = previeFiles.map((item, i) => {
      return URL.createObjectURL(item)
    })

    setpreviewUrls(galleryPreview);
    setShowGalleryModal((prev) => !prev);
  }


  const handleRemoveFile = (i) => {
    setpreviewUrls((prev) => prev.filter((item, idx) => i !== idx))
    setGalleryFiles((prev) => prev.filter((item, idx) => i !== idx))
  }


  const handleCloseGallery = () => {
    setShowGalleryModal(false);
    setpreviewUrls([]);
    setGalleryFiles([]);
    setUrls([])
  }

  const handleGalleryApply = async () => {
    setisLoading(true);
          console.log("galleryfield",GalleryFiles)
    try {
      console.log(Urls)
      if(Urls.length === 0){
         for (let i = 0; i < GalleryFiles?.length; i++) {
        console.log(GalleryFiles[i])
        const response = await uploadFile(GalleryFiles[i]);
        console.log("response", response)
        const newObj = {
          url: response?.url,
          pId: response?.pId
        }
        setUrls((prev) => {
        return [...prev, newObj]
      })
      }
      }

   
      

      if (serviceId && Urls.length !== 0) {
        console.log(Urls)
        const updatedService = await axios.put(`/api/services/${serviceId}`, { gallery: Urls });
        console.log(updatedService)
        if (updatedService.success) {
          handleSetToast("success", updatedService?.data?.message || "service updated successfully")
          dispatch(updateService({
            id: updatedService._id,
            updates: updatedService
          }));

        }
      } else {
        handleSetToast("error", "service id required")
      }

    } catch (error) {
      console.log(error)
      handleSetToast("error", error?.message || "someting went wrong")

    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
      {isLoading && <Loader />}
      {Toast.status && <ToastContainer trigger={Toast.trigger} key={Toast.trigger} type={Toast.type} content={Toast.content} />}
      <PartnerInfo partner={partner} />
      <div className='max-w-2xl bg-gray-100 rounded-lg sm:ml-6 shadow-md shadow-gray-500 p-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl font-bold 
        '>Service offered</h1>
          <button title='add Services' onClick={handleServiceModal} className='h-4 w-4 p-4 rounded-full border cursor-pointer inline-flex justify-center items-center flex-col'><i className="ri-add-line"></i></button>
        </div>
        {
          partner?.services?.length > 0 ? partner?.services?.map((item, i) => (
            <PartnerServiceCard handleSeriveId={handleSeriveId} service={item} ServiceCardOpen={item._id === ServiceCardOpen} handleShowGalleryModal={handleShowGalleryModal} handleServiceCardOpen={handleServiceCardOpen} />
          ))
            : <h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}

      </div>
      {serviceModal && <PartnerServiceModal modal={handleServiceModal} handleAddService={handleAddService} />}

      {
        ShowGalleryModal && previewUrls.length > 0 && <ServiceGallery handleGalleryApply={handleGalleryApply} preview={previewUrls} handleCloseGallery={handleCloseGallery} handleRemoveFile={handleRemoveFile} />
      }

    </div>
  )
}

export default PartnerProfile
