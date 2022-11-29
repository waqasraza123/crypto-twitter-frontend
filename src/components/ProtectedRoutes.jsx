import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {

    let isExpired = true;

    return(
        isExpired ? <Outlet /> : <Navigate to="/login" />
    );

}

export default ProtectedRoutes;