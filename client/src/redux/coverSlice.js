import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backGroundImage: null
};

const coverSlice = createSlice({
  name: "cover",
  initialState,
  reducers: {
    setCover: (state, action) => {
      
      state.backGroundImage = action.payload;
    },
    resetCover: (state) => {
      state.backGroundImage.backGroundImage = null;
    },
    updateField: (state, action) => {
      if (!state.backGroundImage) return;
      console.log(action.payload)
      state.backGroundImage.backGroundImage[action.payload.field] = action.payload.value;
    },
    updateFilter: (state, action) => {
      if (!state.backGroundImage.backGroundImage) return;
      state.backGroundImage.backGroundImage.filter = action.payload;
    },
    adjustFilterField: (state, action) => {
      if (!state.backGroundImage.backGroundImage || !state.backGroundImage.backGroundImage.filter) return;
      console.log(action.payload)
      state.backGroundImage.backGroundImage.filter[action.payload.field] = action.payload.value;
    }
  }
});

export const {
  setCover,
  resetCover,
  updateField,
  updateFilter,
  adjustFilterField
} = coverSlice.actions;

export default coverSlice.reducer;
