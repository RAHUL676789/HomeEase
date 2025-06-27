import React from 'react';
import Loader from '../Other/Loader';
import { useState } from 'react';
import Modal from '../Other/Modal';
import axios from "../../utils/axios/axiosinstance.js"



const Preview = ({ data, onCancel, submit }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false);
  // const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await submit();
      setIsLoading(false);
      setIsModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  const verifyOtp = async (otp) => {
    try {
      const response = await axios.post("/api/partner/signup", { ...data, otp });
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }


  }
  const cancelOtp = () => {
    onCancel()
  }


  return (
    <div className='max-w-xl shadow-md shadow-gray-500 mx-auto px-5 py-6 flex flex-col gap-6'>
      {isLoading && <Loader />}
      {isModal &&<Modal verifyOtp={verifyOtp} cancelOtp={cancelOtp} />}

      <h1 className='text-green-600 text-xl font-bold border-b pb-2'>
        Before Submitting the Form, Please Review Your Details:
      </h1>
{Object.entries(data).map(([key, value]) => (
  <div
    key={key}
    className="mb-3 w-full px-4 py-3 border bg-white rounded shadow-sm flex flex-col"
  >
    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
      {key}
    </span>

    {typeof value === "object" && value !== null ? (
      <div className="pl-3">
        {Object.entries(value).map(([subKey, subVal]) => (
          <div key={subKey} className="flex justify-between py-1">
            <span className="text-sm text-gray-700 font-medium">{subKey}:</span>
            <span className="text-sm text-gray-900 font-bold">{subVal}</span>
          </div>
        ))}
      </div>
    ) : (
      <span className="text-gray-900 text-base font-medium">{value}</span>
    )}
  </div>
))}



      <div className='flex gap-4 justify-end pt-4'>
        <button onClick={() => onCancel()} className='px-6 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded transition cursor-pointer active:translate-y-0.5'>
          Cancel
        </button>
        <button onClick={handleSubmit} className='px-6 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded transition cursor-pointer active:translate-y-0.5'>
          Send-Otp
        </button>
      </div>
    </div>
  );
};

export default Preview;
