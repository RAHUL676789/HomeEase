import React from 'react';
import Loader from '../Other/Loader';
import { useState } from 'react';
import Modal from '../Other/Modal';



const Preview = ({ data,onCancel, submit }) => {
  const [isLoading,setIsLoading] = useState(false)
  const [isModal,setIsModal] = useState(false);

  const handleSubmit = async()=>{
  try{
      setIsLoading(true);
   const data  =  await submit();
   setIsLoading(false);
   setIsModal(true);
  }catch(e){
    console.log(e);
  }



  }
  return (
    <div className='max-w-xl shadow-md shadow-gray-500 mx-auto px-5 py-6 flex flex-col gap-6'>
     {isLoading &&  <Loader/>}
    {isModal &&   <Modal/>}
      
      <h1 className='text-green-600 text-xl font-bold border-b pb-2'>
        Before Submitting the Form, Please Review Your Details:
      </h1>

      {Object.entries(data).map(([key, value]) => (
        <div key={key} className='py-4 px-3 w-full flex justify-between items-center border rounded-md bg-white shadow-sm'>
          <span className='text-gray-700 font-medium'>{key}:</span>
          <span className='font-bold text-gray-900'>{value}</span>
        </div>
      ))}

      <div className='flex gap-4 justify-end pt-4'>
        <button onClick={()=>onCancel()} className='px-6 py-2 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded transition cursor-pointer active:translate-y-0.5'>
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
