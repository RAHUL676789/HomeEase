import axiosInstace from "../Utils/axiosInstace"


export const adminLoginOtp = (body)=>{
    return  axiosInstace.post(`/admin/request-otp`,body)
}

export const adminLoginOtpVerify = (body)=>{
    return  axiosInstace.post("/admin/verifyOtp",body)
}


export const getAdminApi =  ()=>{
    return axiosInstace.get("/admin")
}

export const getAdminHomeApi = ()=>{
    return axiosInstace.get("/admin/home")
}