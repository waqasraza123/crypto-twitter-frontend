import PasswordUpdateForm from "./PasswordUpdateForm";
import UserImage from "../partials/UserImage";
import LoadingIcon from "../partials/LoadingIcon";
import React from "react";
import ProfileForm from "./ProfileForm";
import Logout from "../Logout";
import useProfile from "../../hooks/profile/useProfile";

const Profile = () => {

    const {isLoading, isError, error, data} = useProfile()

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <div>
                        <UserImage photo={data.photo} width="150px" height="150px"/>
                    </div>
                    <div className="mt-5">
                        <Logout />
                    </div>
                </div>
                <div className="col-6">
                    <h4>Update Profile</h4>
                    <ProfileForm user={data} />
                    <PasswordUpdateForm />
                </div>
                <div className="col">

                </div>
            </div>
        </div>
    );
}

export default Profile;