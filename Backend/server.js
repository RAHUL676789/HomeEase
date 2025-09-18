const express = require("express")
const app = express();
const http = require("http")
const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    }
})





module.exports = {app,server,io}