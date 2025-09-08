import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../buttons/Button'

const EditProfile = ({ partner, setPartnerProfileEdit ,handleEditPartnerProfile}) => {
    const divClass = "flex flex-col gap-1"
    const inputClass = `px-4 py-3 border border-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-teal-500`
    const labelClass = `text-gray-800 font-medium text-sm`
    const errorClass = "text-red-600 font-semibold text-sm"

    useEffect(() => {
        let body = document.querySelector("body")
        body.style.overflow = "hidden"
        return () => body.style.overflow = "auto"
    }, [])

    const { handleSubmit, formState: { errors }, register } = useForm({
        defaultValues: {
            fullName: partner?.fullName || "",
            phone: partner?.phone || "",
            address: partner?.address || "",
            email: partner?.email || ""
        }
    })

   

    console.log(errors)
    return (
        <div className='fixed inset-0 bg-black/20 z-50 h-screen w-screen'>

            <div className='h-screen w-full md:w-[75%] bg-white overflow-scroll mx-auto rounded'>
                <div className='sticky top-0 w-full flex justify-between border-b px-4 py-2 bg-white'>
                    <h1 className='text-lg font-semibold'>Edit-Profile</h1>
                    <i onClick={() => setPartnerProfileEdit(false)} className='ri-close-line'></i>
                </div>

                <div className='py-4 px-5 mt-5'>
                    <form onSubmit={handleSubmit(handleEditPartnerProfile)} className='flex flex-col gap-3'>

                        <div className={divClass}>
                            <label className={labelClass}>fullName</label>
                            <input
                                {...register("fullName", {
                                    required: "fullName required",
                                    minLength: { value: 3, message: "fullName should be at least 3 characters" },
                                    maxLength: { value: 20, message: "fullName should be less than 20 characters" }
                                })}
                                type="text"
                                className={inputClass}
                            />
                            {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
                        </div>
                        <div className={divClass}>
                            <label className={labelClass}>Phone</label>
                            <input
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit Indian phone number"
                                    },
                                    maxLength: [10, "phone should be valid"]
                                })}
                                type="number"
                                className={inputClass}
                            />
                            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                        </div>

                        <div className={divClass}>
                            <label className={labelClass}>Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                        message: "Enter a valid email address"
                                    }
                                })}
                                type="email"
                                className={inputClass}
                            />
                            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                        </div>

                        <div className="flex  gap-5 p-4 overflow-scroll">
                            {partner?.address?.pincode &&
                                Object.entries(partner.address).map(([key, value], i) => (
                                    <div key={i} className="text-left flex flex-col gap-4">
                                        <p className={labelClass}>{key}</p>
                                        <input
                                            {...register(`address.${key}`, { required: `${key} is required` })}
                                            className={inputClass}
                                            type="text"
                                            defaultValue={value} // ✅ value की बजाय defaultValue use करें
                                        />
                                           {errors?.address && <p className={errorClass}>{errors?.address[key]?.message}</p>}
                                    </div>
                                ))
                            }
                         

                        </div>

                        <Button htmlType='submit' variant="apply" >Apply Changes</Button>

                    </form>

                </div>

            </div>


        </div>
    )
}

export default EditProfile
