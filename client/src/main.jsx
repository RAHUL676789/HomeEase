import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { useDispatch } from 'react-redux'
import { socket } from './socket/socket.js'
import SocketHandler from './SocketHandle.jsx'



createRoot(document.getElementById('root')).render(

  <Provider store={store}>
     <SocketHandler/>
      <App />
  </Provider>
  
)
