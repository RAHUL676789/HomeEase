import { configureStore } from '@reduxjs/toolkit';
import partnerReducer from "./partnerSlice.js"


export const store = configureStore({
    reducer:{
        partner:partnerReducer
    }
})