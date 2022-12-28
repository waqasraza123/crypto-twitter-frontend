import React from "react";
import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";

const BlogLayout = () => {
    return (
        <>
            <ToastContainer />
            <div className="container my-2">
                <ToastContainer />
                <div className="row">
                    <div className="col">Sidebar Left</div>
                    <div className="col-6">
                        <Outlet />
                    </div>
                    <div className="col">Sidebar Right</div>
                </div>
            </div>
        </>
    )
}

export default BlogLayout