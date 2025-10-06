import React, { useReducer, useState } from 'react';
import Loader from '../Other/Loader';
import Modal from '../Other/Modal';
import axios from '../../utils/axios/axiosinstance.js';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { setPartner } from '../../redux/partnerSlice.js';
import Button from '../buttons/Button.jsx';
import { setToast } from '../../redux/toastSlice.js';

const Preview = ({ data, onCancel, submit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpModal, setshowOtpModal] = useState(false);
   const dispatch = useDispatch();
  const navigate = useNavigate();

  // 📩 Trigger OTP Send API
  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      const res = await submit();
      console.log(res);
      if (res.success) {
        setshowOtpModal(true);
      } else {
        dispatch(setToast({type:"error", content : res?.data?.message || "Something went wrong"}))
      }


    } catch (e) {
      console.error('Submit error:', e);

      dispatch(setToast({type:"error",content : e?.message || "Something went wrong"}))
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ OTP Verification Handler
  const verifyOtp = async (otp) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/partner/signup', { ...data, otp });
      handleShowToast("success",response?.data?.message || "signup successful")
      console.log(response.data);
      dispatch(setPartner(response.data.data))
     
      if (response.data.success) {
        navigate("/partnerProfile");
       }
    } 
    catch (error) {
      console.log(error)
      console.error('OTP Error:', error?.response?.data);
      dispatch(setToast({type:"error",content : error?.response?.data?.message || "Something went wrong"}))
    
    } finally {
      setIsLoading(false);
    }
  };

  // ❌ Close Modal
  const cancelOtp = () => {
    onCancel();
  };

  return (
    <div className='max-w-xl mx-auto px-5 py-6 flex flex-col gap-6 shadow-md shadow-gray-500 bg-white rounded'>
      {isLoading && <Loader />}
      {showOtpModal && <Modal verifyOtp={verifyOtp} cancelOtp={cancelOtp} />}
     
      <h1 className='text-green-600 text-xl font-bold border-b pb-2'>
        Before Submitting the Form, Please Review Your Details:
      </h1>

      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className='mb-3 w-full px-4 py-3 border rounded shadow-sm bg-gray-50 flex flex-col'
        >
          <span className='text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1'>
            {key}
          </span>

          {typeof value === 'object' && value !== null ? (
            <div className='pl-3'>
              {Object.entries(value).map(([subKey, subVal]) => (
                <div key={subKey} className='flex justify-between py-1'>
                  <span className='text-sm text-gray-700 font-medium'>{subKey}:</span>
                  <span className='text-sm text-gray-900 font-bold'>{subVal}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className='text-gray-900 text-base font-medium'>{value}</span>
          )}
        </div>
      ))}

      <div className='flex gap-4 justify-end pt-4'>
        <Button
          onClick={onCancel}
          variant="cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSendOtp}
         variant={"next"}
        >
          Send OTP
        </Button>
      </div>
    </div>
  );
};

export default Preview;
