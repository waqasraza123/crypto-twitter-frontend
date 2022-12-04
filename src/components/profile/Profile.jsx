import React, {useContext} from "react";
import Logout from "../Logout";
import logo from "../../logo.svg"
import {AuthStateContext} from "../../context/context";
import ProfileForm from "./ProfileForm";
import PasswordUpdateForm from "./PasswordUpdateForm";

const Profile = () => {

    const user = useContext(AuthStateContext).userDetails
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/uploads/"
    const profileImageUrl = user.photo !== "" ? url + path + user.photo : logo

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <div>
                        <img src={profileImageUrl} width="150px" height="150px"/>
                    </div>
                    <div className="mt-5">
                        <Logout />
                    </div>
                </div>
                <div className="col-6">
                    <h4>Update Profile</h4>
                    <ProfileForm user={user} />
                    <PasswordUpdateForm />
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    );
}

export default Profile;