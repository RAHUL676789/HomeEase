import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcg from "../../assets/bcg.png";
import pic from "../../assets/pic.jpg";
import PartnerCoverPhoto from './PartnerCoverPhoto';
import AddCoverPhoto from './AddCoverPhoto';
import ToastContainer from '../Other/ToastContainer';
import EditPartnerImage from './EditPartnerImage';
import { useEditableImage } from '../../Hooks/useEditableImage';
import {setCover,
  resetCove,
  updateField,
  updateFilter,
  adjustFilterField} from '../../redux/coverSlice.js'
import { useDispatch } from 'react-redux';

const PartnerInfo = ({ partner }) => {
  const navigate = useNavigate();
  const [showAddCoverPhoto, setshowAddCoverPhoto] = useState(false);
  const [showEditImage, setshowEditImage] = useState(false)
  const [ShowcoverPhotoOptions, setShowcoverPhotoOptions] = useState(false)
  const dispatch = useDispatch();

  const initiaImageState = {
  url: "",
  pid: "",
  zoom:100,
  rotate:0,
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
 
  const [Toast, setToast] = useState({
    type: "",
    content: "",
    trigger: Date.now(),
    status: false
  })


  const handleSetToast = (type, content) => {
    const newTost = {
      type,
      content,
      status: true,
      trigger: Date.now()
    }

    setToast(newTost);
  }
  const {
    fullName = "Your Name",
    backGroundImage,
    profilePicture,
    address = {},
    verified = false,
    services = [],
    documents = [],
    phone = "Not Available",
    email = "example@domain.com",
  } = partner || {};
  
  
  useEffect(() => {
    if (!partner) {
      navigate("/login");
    } else  if(backGroundImage){
        dispatch(setCover(backGroundImage ))
    }
    
  }, [partner, navigate]);

 
  

  const handleAddCoverPhoto = () => {
    setshowAddCoverPhoto(false)
  }
  const handleNextEditCoverPhoto = () => {
    setshowAddCoverPhoto(false);
    setshowEditImage((prev) => !prev);
    reset(backGroundImage)
  }
  const { state = "State", district = "District", country = "Country" } = address;

  return (
    <div className='w-full sm:max-w-2xl mb-14 rounded-lg bg-white sm:ml-6 shadow-md border border-gray-200 overflow-hidden'>
      {/* <PartnerCoverPhoto/> */}
      {Toast.status && <ToastContainer trigger={Toast.trigger} key={Toast.trigger} type={Toast.type} content={Toast.content} />}
      {showAddCoverPhoto && <AddCoverPhoto backImage={backImage} updateField={updateField} handleNextEditCoverPhoto={handleNextEditCoverPhoto} handleSetToast={handleSetToast} handleAddCoverPhoto={handleAddCoverPhoto} />}
      {showEditImage && <EditPartnerImage backImage={backImage} reset={reset} updateField={updateField} adjustFilterField={adjustFilterField} updateFilter={updateFilter} setshowEditImage={setshowEditImage} />}

      {/* 🧠 Separate HEADER SECTION for bg + profile */}
      <div className="relative">
        {/* Background Image or Fallback */}
        <div className="w-full relative h-48 overflow-hidden">
          {backGroundImage ? (
            <img src={backGroundImage.url} alt="Background" className='w-full h-full object-cover' />
          ) : (
            <div className="w-full relative h-full bg-gradient-to-r from-yellow-100-400  to-gray-500 flex items-center justify-center">
              <p className="text-white text-xl font-semibold">Welcome to the Profile</p>


            </div>
          )}
          <i onClick={() => backGroundImage?.url === "" ? setShowcoverPhotoOptions((prev) => !prev) : setshowAddCoverPhoto(true)} className="ri-camera-line text-white absolute right-4 top-4 text-2xl cursor-pointer"></i>

          {ShowcoverPhotoOptions && <div className='absolute right-12 flex bg-white text-black shadow rounded px-3 py-2 flex-col top-5'>
            <button className='hover:bg-gray-200 px-3 py-1 rounded cursor-pointer'>Add cover photo</button>
            <button className='hover:bg-gray-200 px-3 py-1 cursor-pointer rounded'>edit cover photo</button>
          </div>}

        </div>

        {/* Profile Image */}
        <div className='absolute -bottom-16 left-6 z-10'>
          <div className='h-32 w-32 p-1 bg-white border rounded-full flex items-center justify-center overflow-hidden shadow-md'>
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className='h-full w-full rounded-full object-cover' />
            ) : (
              <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center text-4xl font-bold text-gray-600">
                {fullName?.charAt(0).toUpperCase() || <i className="ri-user-line"></i>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🧾 MAIN BODY CONTENT (outside header) */}
      <div className='mt-20 pt-6 px-5 pb-6 sm:flex sm:flex-row flex-col justify-between relative z-0'>

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
        {documents.length > 0 ? (
          <div className="space-y-3 p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Uploaded Documents</h3>
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <i className="ri-file-pdf-line text-red-500 text-2xl"></i>
                  <p className="text-gray-800 font-medium">{doc.name || `Document ${index + 1}`}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                  <button className="text-green-600 hover:underline text-sm">Download</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-400 mt-4">No documents uploaded</div>
        )}
      </div>
    </div>
  );
};

export default PartnerInfo;
