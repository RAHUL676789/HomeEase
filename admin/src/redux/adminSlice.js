import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    admin:null,
    loading:false,
    isLoggedIn:false
}


const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setAdmin:(state,action)=>{
            console.log(action.payload)
            state.admin = action.payload;
            state.loading = false;
            state.isLoggedIn = true;
        }
    }
})



export const {setAdmin} = adminSlice.actions;
export default adminSlice.reducer;
