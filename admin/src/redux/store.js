import {configureStore} from "@reduxjs/toolkit"
import loaderReducer from "../redux/loaderSlice.js"
import toastReducer from "../redux/toastSlice.js"
import adminReducer from "../redux/adminSlice.js"


export const store = configureStore({
    reducer:{
        loader:loaderReducer,
        toast:toastReducer,
        admin:adminReducer
    }
})