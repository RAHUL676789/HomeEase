import React, { useEffect, useState } from 'react'
import pinApi from '../../utils/Apis'
import { set, useForm } from 'react-hook-form'
import Button from '../buttons/Button'
import { useDispatch } from 'react-redux'
import useAsyncWrap from "../../utils/helper/asyncWrap.js"
import { setToast } from '../../redux/toastSlice.js'


const PartnerForm2 = ({ handlePreviData, prevStep }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [pin, setPin] = useState(null)
  const asyncWrap = useAsyncWrap();

  const [AddData, setAddData] = useState({
    country: "",
    state: "",
    district: ""
  })
  const [forceManual, setForceManual] = useState(false);

  const handlePin = async () => {
    if (!pin) return;
    const data = await asyncWrap(() => pinApi(pin), false);
    console.log(data)
    if (data?.data?.Status === "Error" || data?.data?.Status === "404") {
      dispatch(setToast({ type: "error", content: "unable to fetch address please enter a valid pincode" }))
      return;
    }
      setForceManual(true);
      setAddData({ ...data?.data });
  }

  const handleFormSubmit = (data) => {
    const address = {
      pincode: data.pincode,
      state: data.state,
      country: data.country,
      district: data.district,
    };
    handlePreviData({ address });
  }

  const handlInputChange = (e) => {
    setAddData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (pin?.length === 6) {
      handlePin();
    }
  }, [pin]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='max-w-xl flex flex-col bg-gray-100  mx-auto p-8 shadow-md shadow-gray-800'>
      <h2 className='text-center font-bold text-teal-500 text-3xl mb-5'>Address</h2>

      <div className="inp relative flex justify-start items-center mb-4 gap-4">

        <input
          {...register("pincode", {
            required: "pincode is required",
            minLength: { value: 6, message: "pincode must 6 characters" },
            maxLength: { value: 6, message: "pincode maxLength is 6" },
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Pincode must be exactly 6 digits",
            }
          })}
          onInput={(e) => setPin(e.target.value)}
          pattern="[0-9]*"
          maxLength={6}
          type="text"
          placeholder='Enter pincode'
          className='py-3 px-2 bg-white max-w-32'
        />
        {errors.pincode && <p className='text-red-500 text-xs'>{errors.pincode.message}</p>}


      </div>

      {/* Manual + Auto fields */}
      {(AddData.state || AddData.country || AddData.district || forceManual) && (
        <div className='flex overflow-scroll no-scrollbar justify-between px-4 gap-4 py-2'>
          <div className="add flex flex-col">
            <label htmlFor="state" className='text-xs mb-1'>State</label>
            <input
              {...register("state", { required: "state is required" })}
              onChange={handlInputChange}
              name='state'
              value={AddData?.state}
              type="text"
              className='max-w-32 py-3 border-0 outline-0 px-2 bg-white'
            />
            {errors.state && <p className='text-red-500 text-xs'>{errors.state.message}</p>}
          </div>
          <div className="add flex flex-col">
            <label htmlFor="Country" className='text-xs mb-1'>Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              name='country'
              onChange={handlInputChange}
              value={AddData?.country}
              type="text"
              className='max-w-32 px-2 bg-white py-3 border-0 outline-0'
            />
            {errors.country && <p className='text-red-500 text-xs'>{errors.country.message}</p>}
          </div>
          <div className="add flex flex-col">
            <label htmlFor="Dist" className='text-xs mb-1'>Dist</label>
            <input
              {...register("district", { required: "District is required" })}
              onChange={handlInputChange}
              name='district'
              value={AddData?.district}
              type="text"
              className='max-w-32 px-2 py-3 bg-white border-0 outline-0'
            />
            {errors.district && <p className='text-red-500 text-xs'>{errors.district.message}</p>}
          </div>
        </div>
      )}

      <div className='flex gap-4'>
        <Button onClick={prevStep} htmlType='button' variant="next">Prev</Button>
        <Button htmlType='submit' variant="next">Next</Button>
      </div>
    </form>
  )
}

export default PartnerForm2
