import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_API_URL;
const path = "/auth/token";

/**
 * saves a new access token
 * in localstorage
 * @returns {Promise<void>}
 */
const refreshAccessToken = async () => {

    try{
        let response = await axios.post(baseUrl + path, {
            "refresh_token": localStorage.getItem("refreshToken"),
            "email": localStorage.getItem("email")
        });

        if(response){
            console.log(response);
        }

    }catch (err){
        console.log(err.message);
    }
}

export default refreshAccessToken;