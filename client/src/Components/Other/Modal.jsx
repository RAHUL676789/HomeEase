import React, { useEffect, useRef, useState } from 'react';

const Modal = ({ verifyOtp, cancelOtp }) => {
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];
  const [otp,setOtp] = useState(["","","",""]);
  const [otpTime,setTime] = useState(60*5);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value.slice(0, 1);
    if (value && idx < 3) {
      inputsRef[idx + 1].current.focus();
    }
  };

  useEffect(()=>{
    if(otpTime <= 0){
      return;
    }
    const timer = setInterval(()=>{
      setTime((prev)=>prev - 1);
    },1000)

    return ()=>clearInterval(timer)
  })

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      inputsRef[idx - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const otp = inputsRef.map(ref => ref.current.value).join('');
    onVerify(otp); // pass full OTP to parent
  };

  const handlePaste  = (e) =>{

    const paste  = e.clipboardData.getData("text").slice(0,4);
    
     if (!/^\d+$/.test(paste)) return;
    const newOtp = paste.split("");
    const paddedOtp = newOtp.concat(Array(4 - newOtp.length ).fill(""));
     setOtp(paddedOtp)
     console.log(paddedOtp)
    paddedOtp.forEach((val,idx)=>{
       
      if(val && inputsRef[idx].current){
          inputsRef[idx].current.value = val;
      }

    })

    if(inputsRef[paste.length - 1]){
      inputsRef[paste.length - 1].current.focus();
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
      <div onPaste={(e)=>handlePaste(e)} className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold text-gray-800 text-center mb-4'>🔐 Enter OTP</h2>
        
        <p className='text-sm text-gray-600 text-center mb-4'>
          We've sent a 4-digit OTP to your email. Please enter it below.
        </p>

        <div className="flex justify-center gap-3 mb-5">
          {[0, 1, 2, 3].map((idx) => (
            <input
              key={idx}
              ref={inputsRef[idx]}
              type='text'
              maxLength={1}
              inputMode='numeric'
              value={otp[idx]}
              pattern='[0-9]*'
              className='w-12 h-12 text-center border border-gray-300 rounded-lg text-xl outline-none focus:ring-2 focus:ring-green-500 transition-all'
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>

     <p>Valid till {Math.floor(otpTime / 60)}:{String(otpTime % 60).padStart(2, '0')}</p>


        <div className='flex flex-col sm:flex-row justify-center gap-3'>
          <button
            onClick={()=>verifyOtp()}
            className='bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg font-semibold transition-all cursor-pointer'
          >
            ✅ Verify OTP
          </button>
          <button
            onClick={()=>cancelOtp()}
            className='bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg font-semibold transition-all cursor-pointer'
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
