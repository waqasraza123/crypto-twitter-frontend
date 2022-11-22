import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: 0
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment(state){
            console.log("I am being called");
            //immer lib under the hood makes it immutable
            state.value += 1;
        }
    },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;