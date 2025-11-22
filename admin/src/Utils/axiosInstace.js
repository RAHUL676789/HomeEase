import axios from "axios"

console.log(import.meta.env.VITE_BACKEND_URL)

 const  axiosInstace = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})

export default axiosInstace;