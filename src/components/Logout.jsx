import React, {useContext} from "react";
import {logout} from "../context";
import {AuthDispatchContext} from "../context/context";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const authDispatchContext = useContext(AuthDispatchContext)
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            let response = await logout(authDispatchContext)
            if (response){
                navigate("/")
            }
        }catch (error){
            console.log(error)
        }
    }

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;