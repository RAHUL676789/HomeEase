import React, { useRef } from 'react';

const Modal = ({ onVerify, onCancel }) => {
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = value.slice(0, 1);
    if (value && idx < 3) {
      inputsRef[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      inputsRef[idx - 1].current.focus();
    }
  };

  const handleVerify = () => {
    const otp = inputsRef.map(ref => ref.current.value).join('');
    onVerify(otp); // pass full OTP to parent
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-md'>
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
              pattern='[0-9]*'
              className='w-12 h-12 text-center border border-gray-300 rounded-lg text-xl outline-none focus:ring-2 focus:ring-green-500 transition-all'
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-center gap-3'>
          <button
            onClick={handleVerify}
            className='bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg font-semibold transition-all'
          >
            ✅ Verify OTP
          </button>
          <button
            onClick={onCancel}
            className='bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg font-semibold transition-all'
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
