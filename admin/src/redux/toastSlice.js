import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: {
        type: "",
        content: "",
        key: "",
        trigger: ""
    }
}



const toastSlice = createSlice({
    name: "Toast",
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toast.type = action?.payload?.type;
            state.toast.content = action?.payload?.content,
                state.toast.trigger = action?.payload?.trigger || Date.now(),
                state.toast.status = true;
                id:action.payload.id


        }
    }
})


export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
