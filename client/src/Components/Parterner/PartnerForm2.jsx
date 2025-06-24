import React from 'react'

const PartnerForm2 = () => {
  return (
    <form className='max-w-xl flex flex-col bg-gray-100  mx-auto p-8 shadow-md shadow-gray-800'>
      <h2 className='text-center font-bold text-teal-500 text-3xl mb-5'>Address</h2>
      <div className="inp flex flex-col mb-4 gap-4">
        <label htmlFor="" className='text-emerald-600 font-medium mb-1'>Pincode</label>
        <input type="number" placeholder='Enter pincode' className='py-3 px-2 bg-white max-w-32' />
       {false &&  <div className='flex justify-between px-4  py-2'>
          <div className="add flex flex-col"><label htmlFor="state" className='text-xs mb-1'>State</label><input type="text" className='max-w-32 py-3 border-0 outline-0 px-2 bg-white' /></div>
          <div className="add flex flex-col"><label htmlFor="Country" className='text-xs mb-1'>Country</label><input type="text"  className='max-w-32 px-2 bg-white py-3 border-0 outline-0 '/></div>
          <div className="add flex flex-col"><label htmlFor="Dist" className='text-xs mb-1'>Dist</label><input type="text" className='max-w-32 px-2 py-3 bg-white border-0 outline-0' /></div>
        </div>}

      </div>
      <div className="inp flex flex-col gap-4">
        <label htmlFor="cateogary " className='mb-1 text-teal-600 font-medium'>Cateogary</label>
        <select name="cateogary" id="" className='w-full bg-white py-3 px-2'>

          <option value="cleaning">Cleaning</option>
          <option value="cleaning">Cleaning</option>
          <option value="cleaning">Cleaning</option>
          <option value="cleaning">Cleaning</option>
          <option value="cleaning">Cleaning</option>
        </select>
      </div>

      <button className=' px-7 py-3 bg-teal-600 text-white my-5 cursor-pointer active:translate-y-0.5 font-bold'>Submit</button>

    </form>
  )
}

export default PartnerForm2
