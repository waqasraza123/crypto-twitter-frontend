import axios from "axios";
import {toast} from "react-toastify"
import {useContext} from "react";
import {AuthStateContext} from "./context";

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
