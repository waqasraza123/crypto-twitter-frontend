import React, {Component, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../features/user/user-slice";
import axios from "axios";

const Logout = () => {

    const state = {
        email: "",
        isLoggedIn: false
    };

    const dispatch = useDispatch();

    //get email from redux store -> user-slice.js
    const email = useSelector(state => state.user.email);

    const handleLogout = async () => {
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const path = "/auth/logout";

        try{
            const response = await axios.post(baseUrl + path, {
                "email": email
            });

            //save the accessToken on localstorage
            if(response){
                localStorage.removeItem("accessToken");
                response.data.isLoggedIn = false;
            }

            //set the user data in redux state
            //adding the main data which is shared across components and
            //needs to update automatically without any page reload or action by user.
            dispatch(setUserData(response.data));

        }catch (err){
            console.log(err.message);
        }
    }

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Logout;