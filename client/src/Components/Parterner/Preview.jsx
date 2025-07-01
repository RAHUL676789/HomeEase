import React, { useState } from 'react';
import Loader from '../Other/Loader';
import Modal from '../Other/Modal';
import ToastContainer from '../Other/ToastContainer';
import axios from '../../utils/axios/axiosinstance.js';
import { useNavigate } from 'react-router-dom';

const Preview = ({ data, onCancel, submit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const [isToast, setIsToast] = useState({
    status: false,
    type: '',
    content: '',
    trigger: Date.now(),
  });

  // 📩 Trigger OTP Send API
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await submit();
      setIsModal(true);
    } catch (e) {
      console.error('Submit error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ OTP Verification Handler
  const verifyOtp = async (otp) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/partner/signup', { ...data, otp });

      setIsToast({
        type: 'success',
        content: response?.data?.message || 'Signup successful',
        status: true,
        trigger: Date.now(),
      });
      if(response.data.success){
        navigate("/partnerProfile");

      }
    } catch (error) {
      console.error('OTP Error:', error?.response?.data);

      setIsToast({
        type: 'error',
        content: error?.response?.data?.message || 'Something went wrong',
        status: true,
        trigger: Date.now(),
      });
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
      {isModal && <Modal verifyOtp={verifyOtp} cancelOtp={cancelOtp} />}
      {isToast.status && (
        <ToastContainer
        key={isToast.trigger}
          type={isToast.type}
          content={isToast.content}
          trigger={isToast.trigger}
        />
      )}

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
        <button
          onClick={onCancel}
          className='px-6 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded transition active:translate-y-0.5'
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className='px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded transition active:translate-y-0.5'
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default Preview;
