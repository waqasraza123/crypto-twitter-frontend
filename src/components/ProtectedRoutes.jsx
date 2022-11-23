import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoutes = () => {

    const isLoggedIn = useSelector( state => state.user.isLoggedIn );

    return(
        isLoggedIn ? <Outlet /> : <Navigate to="/login" />
    );

}

export default ProtectedRoutes;