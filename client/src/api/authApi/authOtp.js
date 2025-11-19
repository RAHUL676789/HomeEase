import axionInstance from "../../utils/axios/axiosinstance";


export const userSingInOtpApi = async(body)=>{
   return await axionInstance.post("/api/users/sendOtp", body)
}

export const userSingInApi = async(body)=>{
    return await axionInstance.post(`api/users/signup`,body)
}