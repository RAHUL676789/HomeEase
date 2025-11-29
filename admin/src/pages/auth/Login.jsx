import React, { useState } from "react";
import adminLogin from "../../assets/AdminLogin.svg";
import Buttons from "../../components/ui/Buttons";
import { useForm } from "react-hook-form";
import useAsyncWrap from "../../Utils/asyncWrap.js";
import { adminLoginOtp, adminLoginOtpVerify } from "../../Apis/admin.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/adminSlice.js";

const Login = () => {
  const [otpStep, setOtpStep] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const asyncwrap = useAsyncWrap();


  const handleLogin = async (formData) => {
    const { data } = await asyncwrap(() => adminLoginOtp(formData));

    if (data?.data?.success) {
      setOtpStep(true);
      dispatch(setAdmin(data?.data))
    }
  };


  const handleVerifyOtp = async (formData) => {
    const { data } = await asyncwrap(() => adminLoginOtpVerify(formData));
    console.log(data?.data)
    if (data?.data?.success) {
    dispatch(setAdmin(data?.data))
      navigate("/");
    }
  };


  const onSubmit = (formData) => {
    if (!otpStep) {
      handleLogin(formData);
    } else {
      handleVerifyOtp(formData);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#778873] to-[#778873] flex items-center justify-center p-4">
      <div className="flex bg-white/20 backdrop-blur-2xl rounded shadow-2xl overflow-hidden w-full max-w-5xl">

        {/* IMAGE SECTION */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-teal-900/30 p-6">
          <img src={adminLogin} alt="Admin Login" className="w-[85%] drop-shadow-2xl" />
        </div>

        {/* FORM SECTION */}
        <div className="flex-1 bg-white p-10 md:p-14">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

            {/* EMAIL */}
            <div>
              <label className="text-gray-700 font-semibold text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                })}
                disabled={otpStep}
                className="w-full mt-1 p-3 border rounded"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-700 font-semibold text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                disabled={otpStep}
                className="w-full mt-1 p-3 border rounded"
              />
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            {/* OTP FIELD (only after step 1) */}
            {otpStep && (
              <div>
                <label className="text-gray-700 font-semibold text-sm">Enter OTP</label>
                <input
                  type="number"
                  placeholder="Enter OTP"
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: { value: 4, message: "OTP must be 4 digits" },
                    maxLength: { value: 4, message: "OTP must be 4 digits" },
                  })}
                  className="w-full mt-1 p-3 border rounded"
                />
                {errors.otp && <p className="text-red-600">{errors.otp.message}</p>}
              </div>
            )}

            {/* BUTTON */}
            <Buttons type="submit">
              {!otpStep ? "Request OTP" : "Verify OTP"}
            </Buttons>

          </form>

          {/* Forgot Password */}
          <p className="text-center text-sm text-gray-600 mt-5 hover:text-teal-700 cursor-pointer">
            Forgot Password?
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
