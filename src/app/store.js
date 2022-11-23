//configureStore is a wrapper around normal redux createStore function
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import userReducer from "../features/user/user-slice"

/**
 * import the reducer function from the counter slice and add it to our store.
 * By defining a field inside the reducer parameter,
 * we tell the store to use this slice reducer
 * function to handle all updates to that state.
 *
 */
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
});