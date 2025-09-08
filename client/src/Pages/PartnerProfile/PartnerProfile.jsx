import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'
import { getMe } from '../../utils/auth/getMe'
import { addService, deleteService, setPartner, updateService, updateServiceGallery } from '../../redux/partnerSlice'
import Loader from '../../Components/Other/Loader'
import ToastContainer from '../../Components/Other/ToastContainer'
import axios from '../../utils/axios/axiosinstance'
import ServiceGallery from '../../Components/Parterner/ServiceGallery'
import { uploadFile } from '../../utils/cloudinary/uploadFile'
import PartnerGalleryImageView from '../../Components/Parterner/PartnerGalleryImageView'
import DeleteConfirmationMode from '../../Components/Parterner/DeleteConfirmationMode'
import EditService from '../../Components/Parterner/EditService'
import EditProfile from '../../Components/Parterner/EditProfile'
import DeleteUSer from '../../Components/Other/DeleteUSer'
import Button from '../../Components/buttons/Button'

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
  const [PartnerProfileEdit, setPartnerProfileEdit] = useState(false)

  const handleViewImage = (serviceId, image, galleryId) => {
    console.log(serviceId, image)
    const obj = {
      serviceId,
      image,
      galleryId
    }

    setViewImage(obj)
  }
  const [DeleteableService, setDeleteableService] = useState(null);
  const [EditableService, setEditableService] = useState(null);
  const [partnerDelete, setpartnerDelete] = useState(false)

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

  const [uploadbleUrls, setuploadbleUrls] = useState(null);

  const handleGalleryApply = async () => {
    setisLoading(true);
    try {
      console.log("gallery files", GalleryFiles);

      let finalUrls = uploadbleUrls; // state ka purana value use kar lo

      // Step 1: Agar state empty hai to nayi uploading karo
      if (!finalUrls || finalUrls.length === 0) {
        const uploadedUrls = [];
        for (let i = 0; i < GalleryFiles.length; i++) {
          const response = await uploadFile(GalleryFiles[i]);
          uploadedUrls.push({
            url: response?.url,
            pId: response?.pId,
          });
        }
        setuploadbleUrls(uploadedUrls); // ✅ yaha uploadedUrls set karna hai
        finalUrls = uploadedUrls;
      }

      console.log("Uploaded URLs", finalUrls);

      // Step 2: service update call
      if (serviceId && finalUrls.length > 0) {
        const { data } = await axios.put(`/api/services/${serviceId}`, {
          gallery: finalUrls,
        });

        console.log("this is servicegallery daa", data);
        handleSetToast("success", data?.message || "Service updated successfully");

        dispatch(updateService(data?.data));
        setShowGalleryModal(false);
      } else {
        handleSetToast("error", "Service ID required or no files selected");
      }
    } catch (error) {
      console.log(error);
      handleSetToast("error", error?.message || "Something went wrong");
    } finally {
      setisLoading(false);
    }
  };


  const handleImageDelete = async (serviceId, image, galleryId) => {
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

  const handleServiceDelete = async (service) => {
    console.log("this is service to delete", service)
    setisLoading(true)

    try {
      const { data } = await axios.delete(`/api/services/${service?._id}`);
      console.log("this is service deleteble response", data);
      dispatch(deleteService(data?.data))
      handleSetToast("success", data?.message || "service delete successfully");
      setDeleteableService(null);

    } catch (error) {
      console.log(error)
      handleSetToast("error", error?.message || "someting went wrong")

    } finally {
      setisLoading(false)
    }
  }


  const handleChanges = (data) => {
    if (!EditableService?._id) {
      return false;
    }
    console.log(EditableService)
    // Normalize function for trimming strings
    const normalize = (val) => (typeof val === "string" ? val.trim() : val);

    if (normalize(data?.title) !== normalize(EditableService?.title)) {
      console.log("returning")
      return true;
    }

    if (normalize(data?.description) !== normalize(EditableService?.description)) {
      console.log("returning")
      return true;
    }

    if (Number(data?.price) !== Number(EditableService?.price)) {
      console.log("returning")
      return true;
    }

    if (normalize(data?.duration) !== normalize(EditableService?.duration)) {
      console.log("returning")
      return true;
    }

    if (Number(data?.discount || 0) !== Number(EditableService?.discount || 0)) {
      console.log("returning")
      return true;
    }

    // Compare availableDays arrays (order independent)
    const newDays = new Set(data?.availableDays || []);
    const oldDays = new Set(EditableService?.availableDays || []);
    if (newDays.size !== oldDays.size) {
      console.log("returning")
      return true;
    }
    for (let day of newDays) {
      if (!oldDays.has(day)) {
        console.log("returning")
        return true;
      }
    }

    if (normalize(data?.location) !== normalize(EditableService?.location)) {
      console.log("returning")
      return true;
    }

    return false;
  };


  const handleServiceUpdate = async (service) => {
    console.log("this sd", service)
    let changes = handleChanges(service);
    if (!changes) {
      handleSetToast("warning", "please make some changes")
    } else {
      try {
        setisLoading(true);
        const { data } = await axios.put(`/api/services/${service?.id}`, service);
        handleSetToast("success", data.message || "service update successfully");
        dispatch(updateService(data?.data))
        setEditableService(null);
      } catch (error) {
        console.log(error)
        handleSetToast("error", error?.message || "someting went wrong")
      } finally {
        setisLoading(false)
      }
    }
  }


  const detectProfileChanges = (data) => {
    console.log("detecting changes")

    if (data.fullName !== partner.fullName) {
      console.log("Returnig");
      return true;
    }

    if (data.phone !== partner.phone) {
      console.log("return");
      return true;
    }

    if (data.email !== partner.email) {
      console.log("return")
      return true;
    }

    let oldAdd = partner?.address;
    let newAdd = data.address;

    let decision = Object.entries(newAdd).some(([key, value]) => oldAdd[key] !== value);

    return decision;  // true ya false

  }


  const handleEditPartnerProfile =async (formData) => {
    console.log(formData)
    const result = detectProfileChanges(formData);
    console.log(result)
    if (!result) {
    return   handleSetToast("warning", "please some changes")
    }
    try {
      setisLoading(true)
      const {data} = await axios.put(`/api/partner/${partner?._id}`,formData);
      console.log(data);
      handleSetToast("success",data.message);
      dispatch(setPartner(data?.data))
      setPartnerProfileEdit(false)
      
      
      
    } catch (error) {
      console.log(error)
      handleSetToast("error",error?.message || "someting went wrong")
    }finally{
      setisLoading(false)

    }
  }

  const deletePartner = async()=>{
    try {
      setisLoading(true);
      const deleteResponse = await axios.delete(`/api/partner/${partner?._id}`);
      console.log(deleteResponse);
      dispatch(setPartner(deleteResponse?.data?.data));
      handleSetToast("success","partner deleted")
      setpartnerDelete(false)
      
    } catch (error) {
      console.log(error)
      handleSetToast("error",error?.message || "someting went wrong")
    }finally{
      setisLoading(false)

    }
  }
  return (
    <div className='max-w-screen bg-gray-50 py-4 sm:py-12'>
      {isLoading && <Loader />}
      {Toast.status && <ToastContainer trigger={Toast.trigger} key={Toast.trigger} type={Toast.type} content={Toast.content} />}
      <PartnerInfo deletePartner={()=>setpartnerDelete(true)} partner={partner} setPartnerProfileEdit={setPartnerProfileEdit} />
      <div className='max-w-2xl bg-gray-100 rounded-lg sm:ml-6 shadow-md shadow-gray-500 p-5'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl font-bold 
        '>Service offered</h1>
          <Button title='add Services' variant={"apply"} onClick={handleServiceModal} ><i className="ri-add-line"></i></Button>
        </div>
        {
          partner?.services?.length > 0 ? partner?.services?.map((item, i) => (
            <PartnerServiceCard key={item._id || item.id} handleSeriveId={handleSeriveId} service={item} ServiceCardOpen={item._id === ServiceCardOpen} handleShowGalleryModal={handleShowGalleryModal} setViewImage={handleViewImage} handleServiceCardOpen={handleServiceCardOpen} setDeleteableService={setDeleteableService} setEditableService={setEditableService} />
          ))
            : <h2 className='text-sm text-gray-400 mt-4'>No Service Added</h2>}

      </div>
      {serviceModal && <PartnerServiceModal modal={handleServiceModal} handleAddService={handleAddService} />}

      {
        ShowGalleryModal && previewUrls.length > 0 && <ServiceGallery handleGalleryApply={handleGalleryApply} preview={previewUrls} handleCloseGallery={handleCloseGallery} handleRemoveFile={handleRemoveFile} />
      }

      {ViewImage?.image?.url && <PartnerGalleryImageView image={ViewImage} handleImageDelete={handleImageDelete} setViewImage={setViewImage} />}
      {DeleteableService && <DeleteConfirmationMode confirmDelete={handleServiceDelete} data={DeleteableService} cancel={() => setDeleteableService(null)} />}

      {EditableService?._id && <EditService service={EditableService} close={() => setEditableService(null)} handleServiceUpdate={handleServiceUpdate} />}

      {PartnerProfileEdit && <EditProfile handleEditPartnerProfile={handleEditPartnerProfile} partner={partner} setPartnerProfileEdit={setPartnerProfileEdit} />}
      {partnerDelete &&  <DeleteUSer cancel={()=>setpartnerDelete(false)} deleteUser={deletePartner} user={partner}/>}
    </div>
  )
}

export default PartnerProfile
