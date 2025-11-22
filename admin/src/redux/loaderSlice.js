import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoading:false
}


const loaderSlice = createSlice({
    name:"loader",
    initialState,
    reducers:{
        setisLoading:(state,action)=>{
            state.isLoading = action.payload;
        }
    }
})

export const {setisLoading} = loaderSlice.actions;
export default loaderSlice.reducer;