import axios from "axios";
import {redirect} from "react-router-dom";

const url = process.env.REACT_APP_BASE_API_URL;
const path = "/auth/login";

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
            localStorage.setItem("user", JSON.stringify(response.data))
            return redirect("/")
        }

    //catch errors
    }catch (error){
        console.log(error.message);
    }
}

export function logout(dispatch){
    dispatch({
        type: "LOGOUT"
    })

    localStorage.removeItem("user")
    return redirect("/")
}
