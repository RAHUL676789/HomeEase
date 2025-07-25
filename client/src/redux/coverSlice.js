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
    resetCove: (state) => {
      state.backGroundImage = null;
    },
    updateField: (state, action) => {
      if (!state.backGroundImage) return;
      state.backGroundImage[action.payload.field] = action.payload.value;
    },
    updateFilter: (state, action) => {
      if (!state.backGroundImage) return;
      state.backGroundImage.filter = action.payload;
    },
    adjustFilterField: (state, action) => {
      if (!state.backGroundImage || !state.backGroundImage.filter) return;
      state.backGroundImage.filter[action.payload.key] = action.payload.value;
    }
  }
});

export const {
  setCover,
  resetCove,
  updateField,
  updateFilter,
  adjustFilterField
} = coverSlice.actions;

export default coverSlice.reducer;
