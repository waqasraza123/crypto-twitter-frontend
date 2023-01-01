import axios from "axios";
import {toast} from "react-toastify"

const url = process.env.REACT_APP_BASE_API_URL
const path = "/api/login"
const logoutPath = "/api/logout"

/**
 *
 * @param dispatch
 * @param loginPayload
 * @returns {Promise<any>}
 */
export async function loginUser(dispatch, loginPayload){

    try{
        const response = await axios.post(url + path,
            {
                "email": loginPayload.email,
                "password": loginPayload.password
            }
        );

        //user logged in
        if(response){
            //dispatch the LOGIN action for reducer
            dispatch({
                type: "LOGIN",
                payload: response.data
            })

            //save the user in local
            localStorage.setItem("user", JSON.stringify(response.data.user))
            return response
        }
    //catch errors
    }catch (error){
        toast.error(error.response.data.message)
        console.log(error)
    }
}

/**
 *
 * @param dispatch
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function logout(dispatch){

    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).accessToken : ""

    //send request to server to remove the token
    //and logout user
    try{
        const response = await axios.post(url + logoutPath, {}, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if(response){
            dispatch({
                type: "LOGOUT"
            })
        }

        localStorage.removeItem("user")
        return response

    }catch (error){
        console.log(error)
    }
}

/**
 *
 * @param dispatch
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function githubLogin(dispatch, payload){
    const path = "/api/auth/callback/github"
    try{
        const response = await axios.get(url + path + payload.location)
        //user logged in
        if(response){
            //dispatch the LOGIN action for reducer
            dispatch({
                type: "GITHUB_LOGIN",
                payload: response.data.user
            })

            //save the user in local
            localStorage.setItem("user", JSON.stringify(response.data.user))
            return response
        }
    }catch (error){
        console.log(error)
    }
}
