import React, { useReducer, useState } from 'react';
import Modal from '../Other/Modal';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { setPartner } from '../../redux/partnerSlice.js';
import Button from '../buttons/Button.jsx';
import {useAsyncWrap} from "../../utils/helper/asyncWrap.js"
import { verifyPartnerApi } from '../../api/PartnerApi/partnerApi.js';

const Preview = ({ data, onCancel, submit }) => {

  const [showOtpModal, setshowOtpModal] = useState(false);
   const dispatch = useDispatch();
  const asyncWrap = useAsyncWrap();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
 
      const {data} = await asyncWrap(submit);
      console.log(data);
      if (data?.success) {
        setshowOtpModal(true);
      }
  };

 
  const verifyOtp = async (otp) => {
      const {data} = await asyncWrap(()=>verifyPartnerApi({...data,otp}));
      console.log(data?.data);
      dispatch(setPartner(data?.data?.data))
     
      if (data?.data?.success) {
        navigate("/partnerProfile");
       }
  };

 
  const cancelOtp = () => {
    onCancel();
  };

  return (
    <div className='max-w-xl mx-auto px-5 py-6 flex flex-col gap-6 shadow-md shadow-gray-500 bg-white rounded'>
 
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
