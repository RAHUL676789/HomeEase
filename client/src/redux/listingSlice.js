import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listing:null
}


const listingSlice = createSlice({
    initialState,
    name:"listing",
    reducers:{
        setListing:(state,action)=>{
            state.listing = action.payload
        }

    }
})


export const {setListing}=listingSlice.actions;
export default listingSlice.reducer;


