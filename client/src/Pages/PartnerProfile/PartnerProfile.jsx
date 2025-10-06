import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PartnerInfo from '../../Components/Parterner/PartnerInfo'
import PartnerServiceCard from '../../Components/Parterner/PartnerServiceCard'
import PartnerServiceModal from '../../Components/Parterner/PartnerServiceModal'
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
import { socket } from "../../socket/socket.js"
import {setToast} from "../../redux/toastSlice.js"

const PartnerProfile = () => {
  const { partner, loading } = useSelector((state) => state.partner)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔹 All hooks at top level
  const [serviceModal, setserviceModal] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [ServiceCardOpen, setServiceCardOpen] = useState(null);
  const [ShowGalleryModal, setShowGalleryModal] = useState(false);
  const [GalleryFiles, setGalleryFiles] = useState([]);
  const [previewUrls, setpreviewUrls] = useState([]);
  const [serviceId, setserviceId] = useState(null);
  const [ViewImage, setViewImage] = useState(null)
  const [PartnerProfileEdit, setPartnerProfileEdit] = useState(false)
  const [DeleteableService, setDeleteableService] = useState(null);
  const [EditableService, setEditableService] = useState(null);
  const [partnerDelete, setpartnerDelete] = useState(false)
  
  const [uploadbleUrls, setuploadbleUrls] = useState(null);
  const [BookingCardOptionOpen, setBookingCardOptionOpen] = useState(null)

  // 🔹 Effects (no condition wrapping hooks)

  useEffect(() => {
    if (!partner && !loading) {
      navigate("/login")
    }
  }, [partner, loading, navigate])



  // 🔹 Conditional return (safe: no hook inside)
  if (loading) {
    console.log("partner profile loading")
    return (
      <div className='h-screen w-screen flex justify-center items-center flex-col '>
        loading...
      </div>
    )
  }

  // ---------------- Functions ---------------- //
  const filterButtonsClass = 'px-3 py-2 rounded-3xl font-semibold text-xs border border-1 border-teal-500 text-teal-600'

  const handleViewImage = (serviceId, image, galleryId) => {
    setViewImage({ serviceId, image, galleryId })
  }

  const handleSeriveId = (id) => setserviceId(id)
  const handleServiceModal = () => setserviceModal((prev) => !prev)

 

  const handleAddService = async (data) => {
    setisLoading(true);
    try {
      const response = await axios.post("/api/services", data);
      setserviceModal(false);
      dispatch(setToast({type:"success", content:response?.data?.message || "service added "}))
      console.log(response.data.data)
      dispatch(addService(response?.data?.data))
    } catch (error) {
      dispatch(setToast({type:"error", content :error?.response?.data?.message || "someting went wrong"}))
    } finally {
      setisLoading(false);
    }
  }

  const handleServiceCardOpen = (id) => {
    setServiceCardOpen((prev) => (prev === id ? null : id));
  }

  const handleShowGalleryModal = (files) => {
    const previeFiles = Array.from(files);
    setGalleryFiles(previeFiles);
    const galleryPreview = previeFiles.map((item) => URL.createObjectURL(item))
    setpreviewUrls(galleryPreview);
    setShowGalleryModal(true);
  }

  const handleRemoveFile = (i) => {
    setpreviewUrls((prev) => prev.filter((_, idx) => i !== idx))
    setGalleryFiles((prev) => prev.filter((_, idx) => i !== idx))
  }

  const handleCloseGallery = () => {
    setShowGalleryModal(false);
    setpreviewUrls([]);
    setGalleryFiles([]);
  }

  const handleGalleryApply = async () => {
    setisLoading(true);
    try {
      let finalUrls = uploadbleUrls;
      if (!finalUrls || finalUrls.length === 0) {
        const uploadedUrls = [];
        for (let i = 0; i < GalleryFiles.length; i++) {
          const response = await uploadFile(GalleryFiles[i]);
          uploadedUrls.push({
            url: response?.url,
            pId: response?.pId,
          });
        }
        setuploadbleUrls(uploadedUrls);
        finalUrls = uploadedUrls;
      }

      if (serviceId && finalUrls.length > 0) {
        const { data } = await axios.put(`/api/services/${serviceId}`, {
          gallery: finalUrls,
        });
        dispatch(setToast({type:"success", content:data?.message || "Service updated successfully"}));
        dispatch(updateService(data?.data));
        setShowGalleryModal(false);
      } else {
        dispatch(setToast({type:"error",content: "Service ID required or no files selected"}));
      }
    } catch (error) {
      dispatch(setToast({type:"error",content: error?.message || "Something went wrong"}));
    } finally {
      setisLoading(false);
    }
  }

  const handleImageDelete = async (serviceId, image, galleryId) => {
    try {
      setisLoading(true);
      const { data } = await axios.delete(
        `/api/services/${serviceId}/gallery/${galleryId}`,
        { data: { image } }
      );
      dispatch(setToast({type:"success", content :data?.message || "image deleted"}));
      dispatch(updateServiceGallery(data?.data));
      setViewImage(null);
    } catch (error) {
      dispatch(setToast({type:"error", content:error?.message || "someting went wrong"}))
    } finally {
      setisLoading(false)
    }
  }

  const handleServiceDelete = async (service) => {
    setisLoading(true)
    try {
      const { data } = await axios.delete(`/api/services/${service?._id}`);
      dispatch(deleteService(data?.data))
      dispatch(setToast({type:"success",content: data?.message || "service delete successfully"}));
      setDeleteableService(null);
    } catch (error) {
      dispatch(setToast({type:"error", content:error?.message || "someting went wrong"}))
    } finally {
      setisLoading(false)
    }
  }

  const handleChanges = (data) => {
    if (!EditableService?._id) return false;
    const normalize = (val) => (typeof val === "string" ? val.trim() : val);
    if (normalize(data?.title) !== normalize(EditableService?.title)) return true;
    if (normalize(data?.description) !== normalize(EditableService?.description)) return true;
    if (Number(data?.price) !== Number(EditableService?.price)) return true;
    if (normalize(data?.duration) !== normalize(EditableService?.duration)) return true;
    if (Number(data?.discount || 0) !== Number(EditableService?.discount || 0)) return true;
    const newDays = new Set(data?.availableDays || []);
    const oldDays = new Set(EditableService?.availableDays || []);
    if (newDays.size !== oldDays.size) return true;
    for (let day of newDays) if (!oldDays.has(day)) return true;
    if (normalize(data?.location) !== normalize(EditableService?.location)) return true;
    return false;
  };

  const handleServiceUpdate = async (service) => {
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
        handleSetToast("error", error?.message || "someting went wrong")
      } finally {
        setisLoading(false)
      }
    }
  }

  const detectProfileChanges = (data) => {
    if (data.fullName !== partner.fullName) return true;
    if (data.phone !== partner.phone) return true;
    if (data.email !== partner.email) return true;
    let oldAdd = partner?.address;
    let newAdd = data.address;
    return Object.entries(newAdd).some(([key, value]) => oldAdd[key] !== value);
  }

  const handleEditPartnerProfile = async (formData) => {
    const result = detectProfileChanges(formData);
    if (!result) return dispatch(setToast({type:"warning",content: "please some changes"}))
    try {
      setisLoading(true)
      const { data } = await axios.put(`/api/partner/${partner?._id}`, formData);
      dispatch(setToast({type:"success",content: data.message}));
      dispatch(setPartner(data?.data))
      setPartnerProfileEdit(false)
    } catch (error) {
      dispatch(setToast({type:"error", contnet:error?.message || "someting went wrong"}))
    } finally {
      setisLoading(false)
    }
  }

  const deletePartner = async () => {
    try {
      setisLoading(true);
      const deleteResponse = await axios.delete(`/api/partner/${partner?._id}`);
      dispatch(setPartner(deleteResponse?.data?.data));
      dispatch(setToast({type:"success", content:"partner deleted"}))
      setpartnerDelete(false)
    } catch (error) {
      dispatch(setToast({type:"error", content:error?.message || "someting went wrong"}))
    } finally {
      setisLoading(false)
    }
  }

  const hadleBookingOptionOpen = (value) => {
    setBookingCardOptionOpen((prev) => prev === value ? null : value);
  }

  // ---------------- Render ---------------- //
  return (
    <div className="max-w-screen bg-gray-50 py-4 sm:py-12">
      {isLoading && <Loader />}
     

      <div className="flex flex-col sm:flex-row gap-6 px-4">
        {/* Left Panel (60%) */}
        <div className="sm:w-3/5 space-y-6">
          <PartnerInfo
            deletePartner={() => setpartnerDelete(true)}
            partner={partner}
            setPartnerProfileEdit={setPartnerProfileEdit}
          />
          <div className="w-2xl ml-5 bg-gray-100 rounded-lg shadow-md shadow-gray-500 p-5">
            <div className="flex w-full justify-between">
              <h1 className="text-2xl font-bold">Service Offered</h1>
              <Button
                title="add Services"
                variant={"apply"}
                onClick={handleServiceModal}
              >
                <i className="ri-add-line"></i>
              </Button>
            </div>
            {partner?.services?.length > 0 ? (
              partner?.services?.map((item) => (
                <PartnerServiceCard
                  key={item._id || item.id}
                  handleSeriveId={handleSeriveId}
                  service={item}
                  ServiceCardOpen={item._id === ServiceCardOpen}
                  handleShowGalleryModal={handleShowGalleryModal}
                  setViewImage={handleViewImage}
                  handleServiceCardOpen={handleServiceCardOpen}
                  setDeleteableService={setDeleteableService}
                  setEditableService={setEditableService}
                />
              ))
            ) : (
              <h2 className="text-sm text-gray-400 mt-4">No Service Added</h2>
            )}
          </div>
        </div>

        {/* Right Panel (40%) */}
        {/* ⬅️ Tum is panel ka content yaha daaloge */}
      </div>

      {/* Modals */}
      {serviceModal && (
        <PartnerServiceModal
          modal={handleServiceModal}
          handleAddService={handleAddService}
        />
      )}
      {ShowGalleryModal && previewUrls.length > 0 && (
        <ServiceGallery
          handleGalleryApply={handleGalleryApply}
          preview={previewUrls}
          handleCloseGallery={handleCloseGallery}
          handleRemoveFile={handleRemoveFile}
        />
      )}
      {ViewImage?.image?.url && (
        <PartnerGalleryImageView
          image={ViewImage}
          handleImageDelete={handleImageDelete}
          setViewImage={setViewImage}
        />
      )}
      {DeleteableService && (
        <DeleteConfirmationMode
          confirmDelete={handleServiceDelete}
          data={DeleteableService}
          cancel={() => setDeleteableService(null)}
        />
      )}
      {EditableService?._id && (
        <EditService
          service={EditableService}
          close={() => setEditableService(null)}
          handleServiceUpdate={handleServiceUpdate}
        />
      )}
      {PartnerProfileEdit && (
        <EditProfile
          handleEditPartnerProfile={handleEditPartnerProfile}
          partner={partner}
          setPartnerProfileEdit={setPartnerProfileEdit}
        />
      )}
      {partnerDelete && (
        <DeleteUSer
          cancel={() => setpartnerDelete(false)}
          deleteUser={deletePartner}
          user={partner}
        />
      )}
    </div>
  )
}

export default PartnerProfile
