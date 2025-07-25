import React,{useState} from 'react'

import signupImage from "../../assets/signup.svg"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from "../Other/Loader.jsx"
import ToastContainer from "../Other/ToastContainer.jsx"
import axios from "../../utils/axios/axiosinstance.js"

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = ()=>{
        setShowPassword((prev)=>!prev)
    }

    const [isLoading, setisLoading] = useState(false)
    const [showToast, setshowToast] = useState({
        trigger:Date.now(),
        type:"",
        content:"",
        status:false
        
    })

    const {handleSubmit,register,formState:{errors}} = useForm();
    const inputClass = 'bg-white/70 border border-gray-300 py-3 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md backdrop-blur';
    const labelClass = 'font-medium text-gray-800 text-sm';

    const handleSignup = async(data)=>{
        try {
            setisLoading(true);
            const response = await axios.post("/api/user/signup",data);
            console.log(response);
            setshowToast((prev)=>{
                return{
                    type:"success",
                    content:response.data.message || "singup successFully",
                    trigger:Date.now(),
                    status:true
                }
            })
            
        } catch (error) {
            console.log(error);
               setshowToast({
                status: true,
                content: error.response?.data?.message || "singup Failed",
                trigger: Date.now(),
                type: "error"
            });
            setisLoading(false);
        }
    }

    return (
        <div className='min-h-screen   bg-gradient-to-br from-teal-100 to-white p-4'>
            {isLoading && <Loader/>}
            {showToast.status && <ToastContainer key={showToast.trigger} trigger={showToast.trigger} type={showToast.type} content={showToast.content}/>}
            
            <div className='max-w-5xl flex  shadow-lg shadow-gray-500 w-full bg-white/60 overflow-hidden   backdrop:blur-md h-screen rounded-2xl'>
                {/* left illustration */}
                <div className='hidden md:flex md:w-1/2 bg-teal-600 items-center justify-center p-8 h-full'>
                    <img src={signupImage} alt="Login" className='w-4/5 ' />
                </div>

                {/* right form */}
                <div className='w-full overflow-scroll  no-scrollbar md:w-1/2 p-8 md:p-12 bg-white/80'>
                    <h2 className='text-2xl mb-8  text-center font-bold text-teal-600'>Signup to HomeEase</h2>

                    <form   onSubmit={handleSubmit(handleSignup)} className='flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <label htmlFor='fullName' className={labelClass}>
                                FullName
                            </label>
                            <input id='fullName' {...register("fullName",{
                                required:"fullName is required"
                            })} type="text" placeholder='@example john doe' className={inputClass} />

                             {errors.fullName && <p className='text-red-600 text-sm'>* {errors.fullName.message}</p>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className={labelClass}>
                                Email
                            </label>
                            <input id='email'{...register("email",{
                                required:"email is required",
                                  pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                        message: "Enter a valid email"
                                    }
                            })} type="email" placeholder='@example john@gmail.com' className={inputClass} />
                            {errors.email && <p className='text-red-600 text-sm'>* {errors.email.message}</p>}


                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor='password' className={labelClass}>
                                Password
                            </label>
                            <input id='password' {...register("password",{
                                required:"password is required",
                                minLength:{value:6 , message:"password length should be greather 6"}
                            })} type={showPassword ? "text" :"password"} placeholder='*******' className={inputClass} />
                              <i
                                onClick={togglePassword}
                                className={`ri-${showPassword ? "eye-off-line" : "eye-line"} text-lg absolute right-3 top-[38px] cursor-pointer text-gray-600`}
                            ></i>
                              {errors.password && <p className='text-red-600 text-sm'>* {errors.password.message}</p>}



                        </div>
                        <button
                            type="submit"
                            className='mt-4 bg-teal-600 hover:bg-teal-700 transition text-white py-3  rounded-lg font-semibold'
                        >
                            signup
                        </button>
                    </form>
                      <p onClick={() => navigate("/login")} className='text-sm text-center text-gray-600 mt-6'> have an account? <span className='text-teal-600 font-semibold cursor-pointer'>Login</span></p>

                </div>

            </div>



        </div>
    )
}

export default Signup
