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

               const { id, _id, } = action.payload;
               const targetId = id || _id; // support both

               state.partner.services = state.partner.services.map(service =>
                    service._id === targetId ? action.payload : service
               );
          },
          updateServiceGallery: (state, action) => {
               console.log("updateServiceGallery")
               if (!state.partner || !Array.isArray(state.partner.services)) return;
                   console.log("inside updation")
               const { service, deletedId } = action.payload;
               
               state.partner.services = state.partner.services.map(s => {
                    if (s._id.toString() === service._id.toString()) {
                        return service;
                    }else{
                            return s;
                    }
                 
               });
          },
        
          deleteService : (state,action) =>{
                const {service} = action.payload;
                if(state.partner.services && Array.isArray(state.partner.services)){
                    state.partner.services = state.partner.services.filter((s,i)=> s._id.toString() !== service._id.toString())
                }
          }
     }
})


export const { setPartner, clearPartner, addService, updateService,updateServiceGallery,deleteService } = partnerSlice.actions;
export default partnerSlice.reducer;