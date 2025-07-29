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
         },
         addService : (state,action)=>{
          console.log(action.payload)
             state.partner?.services?.push(action.payload);
         }
    }
})


export const { setPartner, clearPartner,addService } = partnerSlice.actions;
export default partnerSlice.reducer;