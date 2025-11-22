import React from "react";
import adminLogin from "../../assets/AdminLogin.svg";
import Buttons from "../../components/ui/Buttons";
import { useForm } from "react-hook-form";
import  useAsyncWrap from "../../Utils/asyncWrap.js"
import { adminLoginOtp } from "../../Apis/admin.js";
import Toast from "../../components/ui/Toast.jsx";
import Loader from "../../components/ui/Loader.jsx";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    const asyncwrap = useAsyncWrap();

  const onSubmit = async(formdata) => {
     const {data} = await asyncwrap(()=>adminLoginOtp(formdata));
     console.log(data)
  };



  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#778873] to-[#778873] flex items-center justify-center p-4">
      <div className="flex bg-white/20 backdrop-blur-2xl rounded shadow-2xl overflow-hidden w-full max-w-5xl">
  
        {/* Left Illustration Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-teal-900/30 p-6">
          <img
            src={adminLogin}
            alt="Admin Login Illustration"
            className="w-[85%] drop-shadow-2xl"
          />
        </div>

        {/* Right Login Form */}
        <div className="flex-1 bg-white p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* Email */}
            <div>
              <label className="text-gray-700 font-semibold text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full mt-1 p-3  rounded focus:ring-2 shadow-sm 
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-semibold text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full mt-1 p-3  rounded focus:ring-2 shadow-sm 
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-emerald-600"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <Buttons type="submit">Request OTP</Buttons>
          </form>

          {/* Forgot Password */}
          <p className="text-center text-sm text-gray-600 mt-5 hover:text-teal-700 cursor-pointer transition">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
