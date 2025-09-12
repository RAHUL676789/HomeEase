import { configureStore } from '@reduxjs/toolkit';
import partnerReducer from "./partnerSlice.js"
import userReducer from "./userSlice.js"
import coverReducer from './coverSlice.js'
import listingReducer from './listingSlice.js';



export const store = configureStore({
    reducer:{
        partner:partnerReducer,
        user:userReducer,
        backImage : coverReducer,
        listing:listingReducer
    }
})