import axionInstance from "../../utils/axios/axiosinstance";

export const updateUserApi  = async (id , body)=>{
    return axionInstance.patch(`/api/users/${id}`,body)
}


