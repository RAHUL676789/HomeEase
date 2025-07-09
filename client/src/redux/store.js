import { configureStore } from '@reduxjs/toolkit';
import partnerReducer from "./partnerSlice.js"
import userReducer from "./userSlice.js"



export const store = configureStore({
    reducer:{
        partner:partnerReducer,
        user:userReducer
    }
})