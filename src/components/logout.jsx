import React, {Component} from "react";

export default class Logout extends Component {

    handleLogout = () => {
        //delete the access token from the localstorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        window.location.href = "/login";
    }

    render() {
        return (
            <button className="btn btn-danger" onClick={this.handleLogout}>
                Logout
            </button>
        );
    }
}