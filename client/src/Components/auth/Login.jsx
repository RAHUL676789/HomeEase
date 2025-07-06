import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../../utils/axios/axiosinstance';
import ToastContainer from '../Other/ToastContainer';
import Loader from '../Other/Loader';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const inputRef = useRef(null);
    const [showToast, setshowToast] = useState({
        status:false,
        trigger:Date.now(),
        type:"",
        content:""
    })

    const handleLogin = async (data) => {
        console.log("Submitted Data:", data);
        setisLoading(true);

        try {
            const response  = await axios.post('/api/auth/login',data);
            console.log(response.data);
            setisLoading(false);
            
        } catch (error) {
            console.log(error.response.data);
            setshowToast((prev)=>{
                return {
                    status:true,
                    content:error.response.data.message,
                    trigger:Date.now(),
                    type:"error"
                }
            })
            setisLoading(false);

        }
    };

    const togglePassword = (e) => {
        e.stopPropagation();
        setShowPassword(prev => !prev);
    };

    const inputClass = 'bg-gray-100 border-b border-gray-300 py-3 px-2 mt-1 focus:outline-none focus:border-teal-500 rounded';
    const labelClass = 'font-semibold text-teal-700 text-sm uppercase';

    return (
        <div className='max-w-md mx-auto my-10 py-10 px-6 rounded-xl bg-white shadow-xl'>
            {showToast.status && <ToastContainer key={showToast.trigger} trigger={showToast.trigger} type={showToast.type} content={showToast.content}/> }
           {isLoading &&  <Loader/> }

            <h2 className='text-center text-teal-600 text-3xl font-bold mb-6'>Login to HomeEase</h2>

            <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-6'>

                {/* Email */}
                <div className='flex flex-col'>
                    <label className={labelClass} htmlFor="email">Email</label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                        id='email'
                        type="email"
                        className={inputClass}
                    />
                    {errors.email && <p className='text-red-500 text-sm mt-1'>* {errors.email.message}</p>}
                </div>

                {/* Password */}

                <div className='flex flex-col relative'>
                    <label className={labelClass} htmlFor="password">Password</label>
                    <input
                        ref={inputRef}
                        {...register("password", {
                            required: "Password is required"
                        })}
                        id='password'
                        type={showPassword ? "text" : "password"}
                        className={`${inputClass} pr-10`}
                    />
                    <i
                        onClick={togglePassword}
                        className={`ri-${showPassword ? "eye-off-line" : "eye-line"} text-xl absolute right-3 top-[38px] cursor-pointer text-gray-500`}
                    ></i>
                    {errors.password && <p className='text-red-500 text-sm mt-1'>* {errors.password.message}</p>}
                </div>


                {/* Submit Button */}
                <div className='text-center'>
                    <button
                        type="submit"
                        className='bg-teal-700 hover:bg-teal-800 transition text-white px-6 py-2 rounded-md font-bold active:scale-[.98]'
                    >
                        Login
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Login;
