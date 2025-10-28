import { createSlice } from "@reduxjs/toolkit";



const initialState = {
     partner: null,
     loading: true
}

const partnerSlice = createSlice({
     name: "partner",
     initialState,
     reducers: {
          setPartner: (state, action) => {
               console.log("setingpartnber")

                    state.loading = true;
               state.partner = action.payload;
               state.loading = false
          },
          clearPartner: (state, action) => {
               state.partner = null;
               state.loading = false
          },
          addService: (state, action) => {
     state.loading = true;
               state.partner?.services?.push(action.payload);
               state.loading = false
          },
          updateService: (state, action) => {
                    state.loading = true;
               if (!state.partner || !Array.isArray(state.partner.services)) return;

               const { id, _id, } = action.payload;
               const targetId = id || _id; // support both

               state.partner.services = state.partner.services.map(service =>
                    service._id === targetId ? action.payload : service
               );
               state.loading = false

          },
          updateServiceGallery: (state, action) => {
                    state.loading = true;
               console.log("updateServiceGallery")
               if (!state.partner || !Array.isArray(state.partner.services)) return;
               console.log("inside updation")
               const { service, deletedId } = action.payload;

               state.partner.services = state.partner.services.map(s => {
                    if (s._id.toString() === service._id.toString()) {
                         return service;
                    } else {
                         return s;
                    }

               });
               state.loading = false

          },

          deleteService: (state, action) => {
                    state.loading = true;
               const { service } = action.payload;
               if (state.partner.services && Array.isArray(state.partner.services)) {
                    state.partner.services = state.partner.services.filter((s, i) => s._id.toString() !== service._id.toString())
               }
               state.loading = false

          },
          addNewPartnerBooking: (state, action) => {
               state.loading = true;
               console.log(action.payload)
               state?.partner?.bookings.push(action.payload)
               state.loading = false
          },
          updatePartnerBooking: (state, action) => {
               if (!state.partner || !Array.isArray(state.partner.bookings)) return;
                    state.loading = true;
                 console.log(action.payload,"for updating partner booking")
               const { id, _id } = action.payload;
               const targetId = id || _id;
               state.partner.bookings = state.partner.bookings.map((b, i) => b._id === targetId ? action.payload : b)
               state.loading = false;
          },
          deletePartnerBooking:(state,action)=>{
          
               if(!state.partner || !Array.isArray(state.partner.bookings))return;
                    state.loading = true;
               const {id,_id} = action.payload;
               const targetId = id || _id;
               state.partner.bookings = state?.partner?.bookings.filter(b=>b._id !== targetId);
               state.loading = false
          }
     }
})


export const { setPartner, clearPartner, addService, updateService, updateServiceGallery, deleteService, addNewPartnerBooking, updatePartnerBooking,deletePartnerBooking } = partnerSlice.actions;
export default partnerSlice.reducer;