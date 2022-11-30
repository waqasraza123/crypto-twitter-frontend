import React, {createContext, useReducer} from "react";
import {authReducer, initialState} from "./reducer";

//context to hold our state
export const AuthStateContext = createContext(); //state or data
//context to update our state
export const AuthDispatchContext = createContext(); //setState or setData

export const AuthProvider = ({children}) => {
    //const [user, setUser] = useState("") in simple words
    //authReducer is a function that updates the user state
    //based on the type of actions create, updated, deleted, loggedIn, loggedout etc...
    const [user, dispatch] = useReducer(authReducer, initialState)

    return(
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}