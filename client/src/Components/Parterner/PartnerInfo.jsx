import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCoverPhoto from './AddCoverPhoto';
import EditPartnerImage from './EditPartnerImage';
import axios from '../../utils/axios/axiosinstance.js';

import { setPartner } from '../../redux/partnerSlice.js';
import {
  setCover,
  resetCover,
  updateField,
  updateFilter,
  adjustFilterField
} from '../../redux/coverSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Other/Loader.jsx';
import { uploadFile } from '../../utils/cloudinary/uploadFile.js';
import DocumentPreview from '../Other/DocumentPreview.jsx';
import Button from '../buttons/Button.jsx';
import { setToast } from '../../redux/toastSlice.js';

const PartnerInfo = ({ partner, setPartnerProfileEdit, deletePartner }) => {
  const [showAddCoverPhoto, setshowAddCoverPhoto] = useState(false);
  const [showEditImage, setshowEditImage] = useState(false)
  const [ShowcoverPhotoOptions, setShowcoverPhotoOptions] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();
  const backImage = useSelector((state) => state.backImage);
  const optionRef = useRef();
  const profileRef = useRef();


  const initiaImageState = {
    backGroundImage: {
      url: "",
      pid: "",
      zoom: 100,
      rotate: 0,
      filter: {
        filterType: "",
        brightness: 0,
        contrast: 0,
        saturation: 0,
        hue: 0,
        grayscale: 0,
        sepia: 0,
      }
    }
  }



  const {
    fullName,
    backGroundImage,
    profilePicture,
    address = {},
    verified = false,
    services = [],
    documents = [],
    phone,
    email,
  } = partner || {};



  useEffect(() => {

    const cover = partner?.backGroundImage
      ? { backGroundImage: partner?.backGroundImage }
      : initiaImageState;

    dispatch(setCover(cover));

  }, [partner]);

  const profileOptionRef = useRef();
  const optionIconRef = useRef();


  useEffect(() => {

    const handleMousedown = (event) => {

      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setShowcoverPhotoOptions(false);
      }

      if ((profileOptionRef.current && !profileOptionRef.current.contains(event.target)) && event.target !== optionIconRef.current) {

        setProfileOptions(false)
      }


    }


    document.addEventListener("mousedown", handleMousedown);

    return () => document.removeEventListener("mousedown", handleMousedown)

  }, [])




  const handleAddCoverPhoto = () => {
    setshowAddCoverPhoto(false)
    const cover = partner?.backGroundImage
      ? { backGroundImage: partner?.backGroundImage }
      : initiaImageState;

    dispatch(setCover(cover));
  }
  const handleNextEditCoverPhoto = () => {
    setshowAddCoverPhoto(false);
    setshowEditImage(true);

  }

  const handleCloseEdit = () => {

    const cover = partner?.backGroundImage
      ? { backGroundImage: partner?.backGroundImage }
      : initiaImageState;

    dispatch(setCover(cover));
    setshowEditImage(false);


  }

  const handleApply = async () => {
    setisLoading(true);

    if (!backImage?.backGroundImage?.backGroundImage?.url) {
      dispatch(setToast({type:"error", content : "coverPhoto required"}));
      setisLoading(false);
      return;
    }

    try {
      // console.log("id", partner?.partner?._id)
      const response = await axios.put(`/api/partner/${partner?._id}`, backImage.backGroundImage);
      console.log(response);
      dispatch(setPartner(response.data.data))
      setshowEditImage((prev) => !prev);

      handleCloseEdit();
      console.log(response.data.data.backGroundImage)
      resetCover(response?.data?.data?.backGroundImage);
      dispatch(setToast({
        type: "success",
        content: response.data.message
      }))

    } catch (error) {
      dispatch(setToast({ type: "error", content: error.message || "someting went wrong" }));

    } finally {
      setisLoading(false);
    }

  }

  // profilePicture
  const [profileInp, setprofileInp] = useState(null);
  const handleProfileChange = async (e) => {
    try {
      console.log("profile change runc")
      setisLoading(true);
      setprofileInp(e.target.files[0]);
      const response = await uploadFile(e.target.files[0]);

      const result = await axios.put(`/api/partner/${partner?._id}`, {
        profilePicture: {
          url: response?.url,
          pid: response?.pId
        }
      });

      if (result?.data?.success) {
        dispatch(setPartner(result?.data?.data));
        handleSetToast("success", result?.data?.message || "profile update successFully")

      }

    } catch (error) {
      handleSetToast("error", error?.message || "someting went wrong")

    } finally {
      setisLoading(false)
      setprofileInp("")
    }

  }
  const { state = "State", district = "District", country = "Country" } = address;
  const documentInpRef = useRef();
  const [pdfUrl, setpdfUrl] = useState("");
  const [showPdfPreview, setshowPdfPreview] = useState(false)
  const [documentFile, setdocumentFile] = useState("");
  const [ProfileOptions, setProfileOptions] = useState(false)

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];



    if (!file?.type?.startsWith("application/pdf") || file.size > 10 * 1024 * 1024) {
      alert("Only PDF files up to 10MB are allowed.");
      return;
    }

    try {
      setdocumentFile(file);
      const response = await handlePdfReview(file);
      setpdfUrl(response);
      setshowPdfPreview(true);


    } catch (error) {
      handleSetToast("error", error)
    } finally {

    }
  };


  const handlePdfReview = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);
      reader.onerror = (err) => {
        reject(err);
      }
    })
  }

  const handleChangePhoto = () => {
    if (documentInpRef.current) {
      documentInpRef.current.click();
    }


  }

  const handleDocumetApply = async () => {

    try {
      setisLoading(true);
      const response = await uploadFile(documentFile);
      console.log(response);
      const result = await axios.put(`/api/partner/${partner?._id}`, {
        documents: {
          url: response?.url,
          pid: response?.pId
        }
      });

      console.log(result);
      if (result.data.success) {
        handleSetToast("success", result?.data?.message || "updated successFully")
        dispatch(setPartner(result?.data?.data))
      }

    } catch (error) {
      handleSetToast("error", error?.message || "someting went wrong")

    } finally {
      setisLoading(false);
      setshowPdfPreview(false)
    }

  }

  const handleDocumentCancel = () => {
    setshowPdfPreview(false);
    setpdfUrl("");

  }
  return (
    <div className='w-full md:w-2xl mb-14 rounded-lg bg-white sm:ml-6 shadow-md border border-gray-200 overflow-hidden '>
      {/* <PartnerCoverPhoto/> */}
      {isLoading && <Loader />}
      {showPdfPreview && <DocumentPreview changePdf={handleChangePhoto} apply={handleDocumetApply} cancel={handleDocumentCancel} url={pdfUrl} />}
   

      {showAddCoverPhoto && <AddCoverPhoto backImage={backImage} updateField={updateField} handleNextEditCoverPhoto={handleNextEditCoverPhoto}  handleAddCoverPhoto={handleAddCoverPhoto} />}

      {showEditImage && <EditPartnerImage handleApply={handleApply} backImage={backImage?.backGroundImage?.backGroundImage} resetCover={resetCover} updateField={updateField} adjustFilterField={adjustFilterField} updateFilter={updateFilter} setshowEditImage={handleCloseEdit} />}

      {/* 🧠 Separate HEADER SECTION for bg + profile */}
      <div className="relative">
        {/* Background Image or Fallback */}
        <div className="w-full relative h-48 overflow-hidden">
          {backGroundImage?.url !== "" ? (
            <img

              style={{
                filter:
                  `brightness(${100 + backGroundImage?.filter?.brightness}%) 
                            contrast(${100 + backGroundImage?.filter?.contrast}%) 
                            saturate(${100 + backGroundImage?.filter?.saturation}%)
                             hue-rotate(${backGroundImage?.filter?.hue}deg)
                             grayscale(${backGroundImage?.filter?.grayscale}%)
                             sepia(${backGroundImage?.filter?.sepia * 100}%)`,
                transform: `rotate(${backGroundImage?.rotate}deg) scale(${backGroundImage?.zoom / 100})`
              }}

              src={backGroundImage?.url} alt="Background" className='w-full h-full object-cover' />
          ) : (
            <div className="w-full relative h-full bg-gradient-to-r from-yellow-100-400  to-gray-500 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Welcome to the Profile</p>


            </div>
          )}
          <i onClick={() => backImage?.backGroundImage?.backGroundImage?.url !== "" ? setShowcoverPhotoOptions((prev) => !prev) : setshowAddCoverPhoto(true)} className="ri-camera-line text-white px-2 py-1 rounded bg-black shadow-md shadow-gray-400 absolute right-4 top-4 text-2xl cursor-pointer"></i>

          {ShowcoverPhotoOptions && backImage?.backGroundImage?.backGroundImage?.url && <div ref={optionRef} className='absolute right-12 flex bg-white text-black shadow rounded px-3 py-2 flex-col top-5'>
            <button onClick={() => setshowAddCoverPhoto((prev) => !prev)} className='hover:bg-gray-200 px-3 py-1 rounded cursor-pointer'>Add cover photo</button>
            <button onClick={() => setshowEditImage((prev) => !prev)} className='hover:bg-gray-200 px-3 py-1 cursor-pointer rounded'>edit cover photo</button>
          </div>}

        </div>

        {/* Profile Image */}
        <div title='Add Profile' onClick={() => {
          if (profileRef.current) {
            profileRef.current.click()
          }
        }} className='absolute -bottom-16 left-6 z-10'>
          <div className='h-32 w-32 p-1 bg-white border rounded-full flex items-center justify-center overflow-hidden shadow-md'>
            {profilePicture?.url !== "" ? (
              <img src={profilePicture?.url} alt="Profile" className='h-full w-full rounded-full object-cover' />
            ) : (
              <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center text-4xl font-bold text-gray-600">
                {fullName?.charAt(0).toUpperCase() || <i className="ri-user-line"></i>}
              </div>
            )}
          </div>
          <input onChange={handleProfileChange} type="file" className='hidden' ref={profileRef} />
        </div>
      </div>

      {/* 🧾 MAIN BODY CONTENT (outside header) */}
      <div className='mt-20 pt-6 px-5 pb-6 sm:flex sm:flex-row flex-col justify-between relative z-0'>

        <div className='absolute right-6 -top-12 cursor-pointer  px-2 rounded-full hover:bg-gray-200 transition-all duration-150 py-1 '>
          <i ref={optionIconRef} onClick={() => setProfileOptions(true)} className="ri-more-2-line font-bold"></i>

        </div>

        {ProfileOptions && <div ref={profileOptionRef} className='absolute right-16 -top-16 shadow-sm shadow-gray-200 px-2 py-3 rounded-sm'>
          <ul>
            <li onClick={() => setPartnerProfileEdit(true)} className='transition-all rounded-sm duration-150 px-3 py-1 hover:shadow-sm font-semibold hover:shadow-gray-300 cursor-pointer'>Edit-Profile</li>
            <li onClick={() => deletePartner()} className=' transition-all duration-150 px-3 py-1 hover:shadow-sm hover:shadow-gray-300  rounded-sm font-semibold cursor-pointer'>Delete-Profile</li>
          </ul>


        </div>}

        {/* Info Section */}
        <div className='mb-5'>
          <h1 className='text-2xl font-semibold text-gray-800'>{fullName}</h1>
          <p className='text-xs text-gray-500 mb-1'>{state}, {district}, {country}</p>

          <p className={`mb-1 flex items-center gap-1 ${verified ? "text-green-600" : "text-gray-400"}`}>
            <i className="ri-verified-badge-line"></i>{verified ? "Verified" : "Not Verified"}
          </p>

          {services.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <i className="ri-shield-star-line text-teal-500 text-lg"></i>
              {services.map((item, i) => (
                <span key={i} className="text-sm bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                  {item.category || "Service"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <i className="ri-shield-star-line text-teal-500"></i>No services added
            </p>
          )}

          <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
            <i className="ri-phone-fill text-green-500"></i>{phone}
          </p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <i className="ri-mail-open-fill text-orange-400"></i>{email}
          </p>
        </div>

        {/* Uploaded Documents */}
        {documents?.length > 0 ? (
          <div className="space-y-3 p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Uploaded Documents</h3>
            {documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <i className="ri-file-pdf-line text-red-500 text-2xl">

                  </i>
                  <p className="text-gray-800 font-medium">{doc.name || `Document ${index + 1}`}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="delete">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div onClick={() => {
            if (documentInpRef.current) {
              documentInpRef.current.click()
            }
          }} className="text-sm cursor-pointer text-gray-400 mt-4 shadow-md shadow-gray-300 h-fit py-2 px-3 rounded">
            No documents uploaded
            <input onChange={handleDocumentUpload} ref={documentInpRef} type="file" className='hidden' />
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerInfo;
