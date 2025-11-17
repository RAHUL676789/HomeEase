import axionInstance from "../../utils/axios/axiosinstance";


export const userSingInOtpApi = async(data)=>{
   return await axionInstance.post("/api/users/sendOtp", data)
}

export const userSingInApi = async(data)=>{
    return await axionInstance.post()
}