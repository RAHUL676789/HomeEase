import axionInstance from "../../utils/axios/axiosinstance";



export const updatesBookingByPartnerApi = async (id,body)=>{
 return axionInstance.patch(`/api/bookings/partner/updates/${id}`,body)
}


export const deleteBookingByPartner = async (id)=>{
    return axionInstance.delete(`/api/bookings/delete-by-partner/${id}`)
}

export const createBookingApi = async(body)=>{
    return axionInstance.post(`/api/bookings`,body)
}

export const deleteBookingByUserApi = async(bookingId)=>{
   return axionInstance.delete(`/api/bookings/user/delete-by-user/${bookingId}`)
}

export const updatesBookingByUserApi = async(bookingId,body)=>{
    return axionInstance.patch(`/api/bookings/user/updates/${bookingId}`,body)
}