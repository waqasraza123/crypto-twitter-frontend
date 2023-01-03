import React from "react";
import logo from "../../logo.svg";

const UserImage = ({photo, width, height}) => {
    const url = process.env.REACT_APP_BASE_API_URL
    const imagesPath = "/images/"
    const profileImageUrl = photo !== null ? url + imagesPath + photo : logo

    return(
        <img src={profileImageUrl} width={width} height={height} />
    )
}

export default UserImage