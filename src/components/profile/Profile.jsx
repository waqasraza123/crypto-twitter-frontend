import React, {useContext, useEffect, useState} from "react";
import Logout from "../Logout";
import logo from "../../logo.svg"
import {AuthStateContext} from "../../context/context";
import ProfileForm from "./ProfileForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import axios from "axios";
import UserImage from "../partials/UserImage";
import LoadingIcon from "../partials/LoadingIcon";
import {useQuery} from "@tanstack/react-query";

const Profile = () => {

    const authUser = useContext(AuthStateContext).userDetails
    const [user, setCurrentUser] = useState(authUser)
    const path = "/api/user-profile"
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token

    const getUserProfile = async () => {
        try{
            const response = await axios.get(url + path, {
                headers: {"Authorization": "Bearer " + token}
            })
            const user = response?.data?.user
            setCurrentUser(user)
            return user
        }catch (error){ return error }
    }

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile
    })

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
                        <UserImage photo={user.photo} width="150px" height="150px"/>
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