import axios from "axios"



const  axionInstance = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})

export default axionInstance;