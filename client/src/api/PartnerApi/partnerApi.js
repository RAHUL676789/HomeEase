import axionInstance from "../../utils/axios/axiosinstance.js"


export const updatePartnerApi = async(id,body)=>{
    return axionInstance.put(`/api/partner/${id}`,body)
}

export const verifyPartnerApi =async (body)=>{
    return axionInstance.post("/api/partner/signup",body)
}

export const deletePartnerApi = async(id)=>{
    return axionInstance.delete(`/api/partner/${id}`);
}