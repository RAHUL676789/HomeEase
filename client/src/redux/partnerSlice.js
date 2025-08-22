import { createSlice } from "@reduxjs/toolkit";



const initialState = {
     partner: null
}

const partnerSlice = createSlice({
     name: "partner",
     initialState,
     reducers: {
          setPartner: (state, action) => {
               state.partner = action.payload;
          },
          clearPartner: (state, action) => {
               state.partner = null;
          },
          addService: (state, action) => {
               console.log(action.payload)
               state.partner?.services?.push(action.payload);
          },
          updateService: (state, action) => {
               if (!state.partner || !Array.isArray(state.partner.services)) return;

               const { id, _id, ...updates } = action.payload;
               const targetId = id || _id; // support both

               state.partner.services = state.partner.services.map(service =>
                    service._id === targetId ? { ...service, ...updates } : service
               );
          }
     }
})


export const { setPartner, clearPartner, addService, updateService } = partnerSlice.actions;
export default partnerSlice.reducer;