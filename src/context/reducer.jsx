let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
let token = user ? user.accessToken : ""

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
                userDetails: action.payload.user,
                token: action.payload.user.accessToken,
                loading: false
            }
        case "GITHUB_LOGIN":
            return {
                ...initialState,
                userDetails: action.payload,
                token: action.payload.accessToken,
                loading: false
            }
        case "GOOGLE_LOGIN":
            return {
                ...initialState,
                userDetails: action.payload,
                token: action.payload.accessToken,
                loading: false
            }
        case "LOGOUT":
            return {
                ...initialState,
                userDetails: "",
                token: "",
                loading: false
            }

        default:
            throw new Error("This Method is not handled!")
    }
}