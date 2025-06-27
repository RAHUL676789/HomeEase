import React, { useState } from 'react'
import WebLoader from '../Other/Loader'
import pinApi from '../../utils/Apis'
import { useForm } from 'react-hook-form'

const PartnerForm2 = ({ handlePreviData, prevStep }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [pin, setPin] = useState(null)
  const [Loader, setLoader] = useState(false);
  const [AddData, setAddData] = useState({
    country: "",
    state: "",
    district: ""
  })

  const handlePin = async () => {
    try {
      setLoader((prev) => !prev)
      const data = await pinApi(pin);
      console.log(data);
      setAddData({ ...data });
      setLoader((prev) => !prev);
    } catch (error) {
      console.log(error)
    }
  }


  const handleFormSubmit = (data)=>{
  const address = {
    pincode: data.pincode,
    state: data.state,
    country: data.country,
    district: data.district,  
  };

  handlePreviData({ address });
  }


  const handlInputChange = (e) => {
    setAddData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='max-w-xl flex flex-col bg-gray-100  mx-auto p-8 shadow-md shadow-gray-800'>
      <h2 className='text-center font-bold text-teal-500 text-3xl mb-5'>Address</h2>
      <div className="inp relative flex justify-start items-center  mb-4 gap-4">
        <label htmlFor="" className='text-emerald-600 font-medium mb-1'>      </label>
        {Loader && <WebLoader />}
        <input {...register("pincode",{
          required:"pincode is required"
        })} onInput={(e) => setPin(e.target.value)} type="number" placeholder='Enter pincode' className='py-3 px-2 bg-white max-w-32' />
        {errors.pincode && <p className='text-red-500 text-xs'> {errors.pincode.message}</p>}
        <button onClick={handlePin} type='button' className='border bg-teal-500 text-xs  text-white active:translate-y-0.5 py-0 cursor-pointer font-bold h-8 w-16 text-center'>Search</button>



      </div>
      {AddData.country && <div className='flex overflow-scroll no-scrollbar justify-between px-4  gap-4 py-2'>
        <div className="add flex flex-col "><label htmlFor="state" className='text-xs mb-1'>State</label>
          <input {...register("state",{
            required:"state is required"
          })} onChange={handlInputChange} name='state' value={AddData?.state} type="text" className='max-w-32 py-3 border-0 outline-0 px-2 bg-white' />
          {errors.state && <p className='text-red-500 text-xs'>{errors.state.message} </p>}
          </div>
        <div className="add flex flex-col"><label htmlFor="Country" className='text-xs mb-1'>Country</label><input {...register("country",{
          required:"Country is required"
        })} name='country' onChange={handlInputChange} value={AddData?.country} type="text" className='max-w-32 px-2 bg-white py-3 border-0 outline-0 ' />
          {errors.country && <p className='text-red-500 text-xs'>{errors.country.message} </p>}
        </div>
        <div className="add flex flex-col"><label htmlFor="Dist" className='text-xs mb-1'>Dist</label><input {...register("district",{
          required:"District is required"
        })} onChange={handlInputChange} name='district' value={AddData?.district} type="text" className='max-w-32 px-2 py-3 bg-white border-0 outline-0' />
          {errors.district && <p className='text-red-500 text-xs'>{errors.district.message} </p>}
        </div>
      </div>
      }
    

      <div className='flex gap-4'>
        <button onClick={prevStep} type='button' className=' px-7 py-3 bg-teal-600 text-white my-5 cursor-pointer active:translate-y-0.5 font-bold'>prev</button>
        <button type='submit' className=' px-7 py-3 bg-teal-600 text-white my-5 cursor-pointer active:translate-y-0.5 font-bold'>Next</button>

      </div>

    </form>
  )
}

export default PartnerForm2
