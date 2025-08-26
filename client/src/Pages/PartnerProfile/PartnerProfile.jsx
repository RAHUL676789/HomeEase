import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'
import { getMe } from '../../utils/auth/getMe'
import { addService, setPartner, updateService,updateServiceGallery } from '../../redux/partnerSlice'
import Loader from '../../Components/Other/Loader'
import ToastContainer from '../../Components/Other/ToastContainer'
import axios from '../../utils/axios/axiosinstance'
import ServiceGallery from '../../Components/Parterner/ServiceGallery'
import { uploadFile } from '../../utils/cloudinary/uploadFile'
import PartnerGalleryImageView from '../../Components/Parterner/PartnerGalleryImageView'

const PartnerProfile = () => {
  const partner = useSelector((state) => state.partner.partner)
  const navigate = useNavigate();
  const [serviceModal, setserviceModal] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [ServiceCardOpen, setServiceCardOpen] = useState(null);
  const [ShowGalleryModal, setShowGalleryModal] = useState(false);
  const [GalleryFiles, setGalleryFiles] = useState([]);
  const [previewUrls, setpreviewUrls] = useState([]);
  // const [Urls, setUrls] = useState([]);
  const [serviceId, setserviceId] = useState(null);
  const [ViewImage, setViewImage] = useState(null)
  const dispatch = useDispatch();

  const handleViewImage = (serviceId, image,galleryId) => {
    console.log(serviceId, image)
    const obj = {
      serviceId,
      image,
      galleryId
    }

    setViewImage(obj)
  }


  const handleSeriveId = (id) => {
    console.log("this is service id", id)
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

  }
  const handleGalleryApply = async () => {
    setisLoading(true);
    try {
      console.log("gallery files", GalleryFiles);

      // Step 1: Sare uploads ek sath complete karo
      const uploadedUrls = [];
      for (let i = 0; i < GalleryFiles.length; i++) {
        const response = await uploadFile(GalleryFiles[i]);
        uploadedUrls.push({
          url: response?.url,
          pId: response?.pId,
        });
      }

      // Step 2: ek hi baar state update karo
      // setUrls(uploadedUrls);

      console.log("Uploaded URLs", uploadedUrls);

      // Step 3: service update call
      if (serviceId && uploadedUrls.length > 0) {
        const { data } = await axios.put(`/api/services/${serviceId}`, {
          gallery: uploadedUrls,
        });

        console.log("this is servicegallery daa", data)
        handleSetToast("success", data?.message || "Service updated successfully");

        dispatch(
          updateService(data?.data)
        );
      } else {
        handleSetToast("error", "Service ID required or no files selected");
      }
    } catch (error) {
      console.log(error);
      handleSetToast("error", error?.message || "Something went wrong");
    } finally {
      setisLoading(false);
      setShowGalleryModal(false)
    }
  };

  const handleImageDelete = async (serviceId, image,galleryId) => {
   console.log(galleryId)

    try {
      setisLoading(true);
      const { data } = await axios.delete(
        `/api/services/${serviceId}/gallery/${galleryId}`,
        {
          data: { image }, 
        }
      );

      console.log(data);
      handleSetToast("success", data?.message || "image deleted");
      dispatch(updateServiceGallery(data?.data));
      setViewImage(null);

    } catch (error) {
      handleSetToast("error", error?.message || "someting went wrong")
    } finally {
      setisLoading(false)
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
            <PartnerServiceCard handleSeriveId={handleSeriveId} service={item} ServiceCardOpen={item._id === ServiceCardOpen} handleShowGalleryModal={handleShowGalleryModal} setViewImage={handleViewImage} handleServiceCardOpen={handleServiceCardOpen} />
          ))
            : <h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}

      </div>
      {serviceModal && <PartnerServiceModal modal={handleServiceModal} handleAddService={handleAddService} />}

      {
        ShowGalleryModal && previewUrls.length > 0 && <ServiceGallery handleGalleryApply={handleGalleryApply} preview={previewUrls} handleCloseGallery={handleCloseGallery} handleRemoveFile={handleRemoveFile} />
      }

      {ViewImage?.image?.url && <PartnerGalleryImageView image={ViewImage} handleImageDelete={handleImageDelete} setViewImage={setViewImage} />}
    </div>
  )
}

export default PartnerProfile
