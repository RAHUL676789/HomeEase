// src/components/Auth/Login.jsx

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import loginImage from '../../assets/login.svg' // 🔁 You can replace with any image
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPartner } from '../../redux/partnerSlice';
import { setUser } from '../../redux/userSlice';
import { socket } from '../../socket/socket';
import useAsyncWrap from '../../utils/helper/asyncWrap';
import { loginApi } from '../../api/authApi/login';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const  asyncWrap = useAsyncWrap();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/"

    const handleLogin = async (formData) => {
        const { data, error } = await asyncWrap(() => loginApi(formData));

        if (error) {
            console.log("Login failed:", error);
            return;
        }

        const userData = data?.data?.data;
        const role = data?.data?.role;

        if (!role || !userData) return;

        if (role === "Partner") {
            dispatch(setPartner(userData));
            dispatch(setUser(null));
            socket.emit("partner-join", userData._id);
        } else if (role === "User") {
            dispatch(setUser(userData));
            dispatch(setPartner(null));
            socket.emit("user-join", userData._id);
        }

        navigate(from, { replace: true });
    };


    const togglePassword = (e) => {
        e.stopPropagation();
        setShowPassword(prev => !prev);
    };

    const inputClass = 'bg-white/70 border border-gray-300 py-3 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md backdrop-blur';
    const labelClass = 'font-medium text-gray-800 text-sm';

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-white p-4'>
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
