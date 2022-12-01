let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).user
    : "";
let token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).accessToken
    : "";

export const initialState = {
    userDetails: "" || user,
    token: "" || token,
    loading: false,
    errorMessage: null
}

/**
 *
 * @param initialState
 * @param action (methods to update the state)
 *
 */
export const authReducer = (initialState, action) => {
    switch (action.type){
        case "LOGIN":
            return {
                ...initialState,
                user: action.payload.user,
                token: action.payload.auth_token,
                loading: false
            }
        case "LOGOUT":
            return {
                ...initialState,
                user: "",
                token: ""
            }

        default:
            throw new Error("This Method is not handled!")
    }
}