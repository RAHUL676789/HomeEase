import axionInstance from "../../utils/axios/axiosinstance";



export const updateBookingApi = async (id,body)=>{
 return axionInstance.put(`/api/bookings/${id}`,body)
}


export const deleteBookingApi = async (id)=>{
    return axionInstance.delete(`/api/bookings/${id}`)
}

export const createBookingApi = async(body)=>{
    return axionInstance.post(`/api/bookings`,body)
}