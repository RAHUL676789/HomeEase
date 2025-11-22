import axiosInstace from "../Utils/axiosInstace"


export const adminLoginOtp = (body)=>{
    return axiosInstace.post(`/api/admin/request-otp`,body)
}

export const adminLoginOtpVerify = (body)=>{
    return axiosInstace.post("/api/admin/verifyOtp",body)
}
