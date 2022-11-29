import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: {
        name: "",
        email: "",
        isLoggedIn: false
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //on login it will be true and on logged out it will be false
        setUserData(state, action){

            state.isLoggedIn = action.payload.isLoggedIn;
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;