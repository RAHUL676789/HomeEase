import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    toast:{
        type:"",
        content:"",
        trigger:"",
        key:""
    }
}

const toastSlice = createSlice({
    name:"toast",
    initialState,
    reducers:{
        setToast :(state,action)=>{
            state.toast.type = action?.payload?.type;
            state.toast.content = action?.payload?.content,
            state.toast.trigger = action?.payload?.trigger || Date.now(),
            state.toast.key = action?.payload?.key || Date.now()

        }
    }
})


export const {setToast} = toastSlice.actions;
export default toastSlice.reducer;