import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {googleLogin} from "../../context/actions";
import {AuthDispatchContext} from "../../context/context";
import {toast, ToastContainer} from "react-toastify";

const GoogleLogin = () => {

    const dispatch = useContext(AuthDispatchContext)
    const [queryParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()

    async function loginWithGoogle(){

        const payload = {
            location: location.search
        }
        try{
            const response = await toast.promise(
                googleLogin(dispatch, payload),
                {
                    pending: 'Login is pending',
                    success: 'Logged In, redirecting 👌',
                    error: 'Failed to login 🤯'
                }
            )

            if(response?.data?.user?.accessToken){
                navigate("/")
            }

        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(queryParams.get("code") !== null){
            loginWithGoogle().catch(error => console.log(error))
        }
    })

    return(
        <div>
            <ToastContainer />
        </div>
    )
}

export default GoogleLogin