import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { useDispatch } from 'react-redux'
import { socket } from './socket/socket.js'


function SocketHandler(){
  const dispatch = useDispatch();
  socket.on("connect",(data)=>{
    console.log("socket connected")
  })

  socket.on("new-booking",(data)=>{
    console.log(data)
  })

  socket.on("booking-status",(data)=>{
    console.log(data);
  })

  return ()=>{
    socket.off("new-booking")
    socket.off("booking-status")
  }

  return null  

}

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <SocketHandler/>
      <App />
  </Provider>
  
)
