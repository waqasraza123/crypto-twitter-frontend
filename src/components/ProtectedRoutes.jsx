import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {

    const data = JSON.parse(localStorage.getItem("user"))

    return(
        (data && data.accessToken) ? <Outlet /> : <Navigate to="/login" />
    );

}

export default ProtectedRoutes;