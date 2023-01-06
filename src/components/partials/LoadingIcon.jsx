import React from "react";
import {ColorRing, Triangle} from "react-loader-spinner";

const LoadingIcon = () => {
    return (
        <div className="d-flex justify-content-center">
            <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export const ColorRingLoadingIcon = () => {
    return(
        <ColorRing
            visible={true}
            height="50"
            width="50"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    )
}

export default LoadingIcon