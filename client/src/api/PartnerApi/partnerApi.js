import axionInstance from "../../../utils/axios/axiosinstance";


export const updatePartnerApi = (id,body)=>{
    return axionInstance.put(`/api/partner/${id}`,body)
}

export const verifyPartnerApi = (body)=>{
    return axionInstance.post("/api/partner/signup",body)
}