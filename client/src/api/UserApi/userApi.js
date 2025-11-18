import axionInstance from "../../utils/axios/axiosinstance";

export const updateUserApi  = async (id , body)=>{
    return axionInstance.put(`/api/users/settings/${id}`,body)
}


export const deleteUSerBookingApi = async(bookingId)=>{
   return axionInstance.delete(`/api/bookings/${bookingId}`)
}

export const updateUserBookingApi = async(bookingId,body)=>{
    return axionInstance.put(`/api/bookings/user/updates/${bookingId}`,body)
}