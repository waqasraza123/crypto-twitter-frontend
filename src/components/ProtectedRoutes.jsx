import React, {Component} from "react";
import {Navigate, Outlet} from "react-router-dom";

export default class ProtectedRoutes extends Component {

    render() {

        const isLoggedIn = localStorage.getItem("accessToken");

        return(
            isLoggedIn ? <Outlet /> : <Navigate to="/login" />
        );
    }

}