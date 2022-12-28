import React, {useContext, useEffect, useState} from "react";
import Logout from "../Logout";
import logo from "../../logo.svg"
import {AuthStateContext} from "../../context/context";
import ProfileForm from "./ProfileForm";
import PasswordUpdateForm from "./PasswordUpdateForm";
import axios from "axios";

const Profile = () => {

    const authUser = useContext(AuthStateContext).userDetails
    const [user, setCurrentUser] = useState(authUser)
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/user-profile"
    const imagesPath = "/images/"
    const profileImageUrl = user.photo !== "" ? url + imagesPath + user.photo : logo
    const token = useContext(AuthStateContext).token

    useEffect(() => {
        const getUserProfile = async () => {
            const response = await axios.get(url + path, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if(response){
                setCurrentUser(response.data.user)
            }
        }

        //call the fn and catch errors
        getUserProfile().catch(error => {
            console.log(error)
        })
    }, [])

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