import React, {useContext} from "react";
import Logout from "./Logout";
import logo from "../logo.svg"
import {AuthStateContext} from "../context/context";

const Profile = () => {

    const user = useContext(AuthStateContext).userDetails

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <img src={logo} />
                        </div>
                        <div className="col-6">
                            <h2>Name: {user.name}</h2>
                            <p>Email: {user.email}</p>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;