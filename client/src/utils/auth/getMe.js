import { setPartner } from "../../redux/partnerSlice";
import axios from "../axios/axiosinstance";


export const getMe =  async()=>{
    try {
         const response = await axios.get("/api/auth/me");
         console.log(response.data)
         
         return {
            data:response?.data?.data,
            message:response?.data?.message
         }
    } catch (error) {
        return {
            data:null,
            message:error?.message || "someting went wrong"
        }
    }
}
