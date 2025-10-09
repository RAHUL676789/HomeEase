// src/components/Auth/Login.jsx

import React, { useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import axios from '../../utils/axios/axiosinstance';
import ToastContainer from '../Other/ToastContainer';
import Loader from '../Other/Loader';
import loginImage from '../../assets/login.svg' // 🔁 You can replace with any image
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPartner } from '../../redux/partnerSlice';
import { setUser } from '../../redux/userSlice';
import { socket } from '../../socket/socket';
import { setToast } from '../../redux/toastSlice';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/"

    const handleLogin = async (data) => {
        setisLoading(true);
        try {
            const response = await axios.post('/api/auth/login', data);
            console.log(response.data);

            if (response.data.role == "Partner") {
                navigate(from,{replace:true})
                dispatch(setPartner(response.data.data))
                socket.emit("partner-join", (response.data.data._id))
                dispatch(setToast({
                    status: true,
                    content: "Login successfully",
                    trigger: Date.now(),
                    type: "success"
                }))

            } else if (response?.data?.role == "User") {
               navigate(from,{replace:true})
                dispatch(setUser(response?.data.data));
                socket.emit("user-join", (response.data.data._id))
                dispatch(setToast({
                    status: true,
                    content: "Login successfully",
                    trigger: Date.now(),
                    type: "success"
                }))
            }
        } catch (error) {

            dispatch(setToast({
                status: true,
                content: error.response?.data?.message || "Login Failed",
                trigger: Date.now(),
                type: "error"
            }))

        } finally {
            setisLoading(false);
        }
    };

    const togglePassword = (e) => {
        e.stopPropagation();
        setShowPassword(prev => !prev);
    };

    const inputClass = 'bg-white/70 border border-gray-300 py-3 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md backdrop-blur';
    const labelClass = 'font-medium text-gray-800 text-sm';

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-white p-4'>
            {isLoading && <Loader />}
            <div className='flex max-w-5xl w-full bg-white/60 shadow-lg rounded-2xl overflow-hidden backdrop-blur-md'>

                {/* Left Illustration */}
                <div className='hidden md:flex md:w-1/2 bg-teal-600 items-center justify-center p-8'>
                    <img src={loginImage} alt="Login" className='w-4/5' />
                </div>

                {/* Right Form */}
                <div className='w-full md:w-1/2 p-8 md:p-12 bg-white/80'>

                    <h2 className='text-3xl font-bold text-teal-700 text-center mb-8'>Welcome Back!</h2>

                    <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-5'>

                        {/* Email */}
                        <div className='flex flex-col'>
                            <label className={labelClass} htmlFor="email">Email</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                        message: "Enter a valid email"
                                    }
                                })}
                                type="email"
                                id="email"
                                className={inputClass}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className='text-sm text-red-500 mt-1'>* {errors.email.message}</p>}
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
                                placeholder="********"
                            />
                            <i
                                onClick={togglePassword}
                                className={`ri-${showPassword ? "eye-off-line" : "eye-line"} text-lg absolute right-3 top-[42px] cursor-pointer text-gray-600`}
                            ></i>
                            {errors.password && <p className='text-sm text-red-500 mt-1'>* {errors.password.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className='mt-4 bg-teal-600 hover:bg-teal-700 transition text-white py-3 rounded-lg font-semibold'
                        >
                            Login
                        </button>
                    </form>

                    <p onClick={() => navigate("/signup")} className='text-sm text-center text-gray-600 mt-6'>Don't have an account? <span className='text-teal-600 font-semibold cursor-pointer'>Sign up</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
