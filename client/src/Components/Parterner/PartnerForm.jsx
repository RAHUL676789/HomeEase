import React from 'react'
import { useForm } from "react-hook-form"
const PartnerForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const formSubmit = (data)=>{
        
console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(formSubmit)} className='bg-gray-100  max-w-xl mx-auto p-8 rounded-lg  shadow-sm shadow-gray-800 '>
            <h2 className='text-center font-bold text-3xl mb-3 text-teal-900'>Register Now </h2>
            <div className="inp flex flex-col mb-4">
                <label className='mb-1 font-bold text-teal-500' htmlFor="fullName">
                    FullName
                </label>
                <input {...register("fullName", {
                    required: "FullName is required"
                })} type="text" placeholder='Enter Your Full Name' className='bg-white py-3 px-2 border-0 outline-0' />
                {errors.fullName && <p className='text-red-500 text-sm'>* {errors.fullName.message}</p>}
            </div>

            <div className="inp flex flex-col mb-4">
                <label className='mb-1 font-bold text-teal-500' htmlFor="fullName">
                    Email
                </label>
                <input {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: "Enter a valid email address"
                    }
                })} type="email" placeholder='Enter Your Full Name' className='bg-white py-3 px-2 border-0 outline-0' />
                {errors.email && <p className='text-red-500 text-sm'>* {errors.email.message}</p>}
            </div>
            <div className="inp flex flex-col mb-4">
                <label className='mb-1 font-bold text-teal-500' htmlFor="fullName">
                    Phone
                </label>
                <input {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter a valid 10-digit Indian phone number"
                    },
                    maxLength:[10,"phone should be valid"]
                })} type="number" placeholder='Enter Your Full Name' className='bg-white py-3 px-2 border-0 outline-0' />
                {errors.phone && <p className='text-red-500 text-sm'>* {errors.phone.message}</p>}
            </div>
            <div className="inp flex flex-col mb-4">
                <label className='mb-1 font-bold text-teal-500' htmlFor="fullName">
                    Password
                </label>
                <input {...register("password",{
                    required:"password is required"
                })} type="password" placeholder='Enter Your Full Name' className='bg-white py-3 px-2 border-0 outline-0' />
                {errors.password && <p className='text-red-500 text-sm'>* {errors.password.message}</p>}
            </div>
            <button className='bg-teal-500 text-white font-bold active:translate-y-0.5 cursor-pointer px-7 py-3'>Next</button>

        </form>
    )
}

export default PartnerForm
