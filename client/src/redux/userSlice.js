import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState, // ✅ Correct spelling here
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    addnewUserBooking:(state,action)=>{
       if(!state.user || !Array.isArray(state.user.bookings))return;
         state?.user?.bookings?.push(action.payload)
    },
    updateUserBookings:(state,action)=>{
       if(!state.user || !Array.isArray(state?.user?.bookings))return;
         const {id,_id} = action.payload;
         const targetId = id || _id;
         console.log(targetId)
        state.user.bookings = state?.user?.bookings?.map(b=>b._id === targetId ? action.payload : b)
    },
    deleteUserBooking : (state,action)=>{
      if(!state?.user || !Array.isArray(state?.user?.bookings))return;
      const {id,_id} = action.payload;
      const targetId = id || _id;
      state.user.bookings = state?.user?.bookings?.filter(b=>b._id !== targetId)
    }
  },
});

export const { setUser, clearUser,addnewUserBooking,updateUserBookings,deleteUserBooking } = userSlice.actions;
export default userSlice.reducer;
