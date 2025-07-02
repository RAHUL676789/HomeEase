import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    partner:null
}

const partnerSlice = createSlice({
    name:"partner",
    initialState,
    reducers:{
         setPartner:(state,action)=>{
              state.partner = action.payload;
         },
         clearPartner:(state,action)=>{
              state.partner = null;
         }
    }
})


export const { setPartner, clearPartner } = partnerSlice.actions;
export default partnerSlice.reducer;