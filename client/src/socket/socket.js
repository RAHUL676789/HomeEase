import {io} from "socket.io-client"


const socket_URL = import.meta.env.VITE_BACKEND_URL

export const socket = io(socket_URL,{
    withCredentials:true,
    transports:["websocket"]
})

