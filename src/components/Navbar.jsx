import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {AuthStateContext} from "../context/context";

const Navbar = () => {

    const user = useContext(AuthStateContext)
    const name = user.userDetails.name || ""

    //normal function
    //returns other components conditionally
    function handleAuthButtons() {

        if(name){
            return <ProfileButton />
        }else{
            return <AuthButtons />
        }
    }

    //functional component
    function ProfileButton(){
        return (
            <button className="btn btn-outline-success btn-success">
                <Link className="text-decoration-none text-white" to="/profile">
                    My Profile
                </Link>
            </button>
        );
    }

    //functional component
    function AuthButtons(){
        return (
            <>
                <button type="button" className="btn btn-success btn-sm me-2">
                    <Link className="text-decoration-none text-white" to="/login">Login</Link>
                </button>
            </>
        );
    }

    //functional component
    //returns a navbar list item li
    function NavbarItem(props){
        return(
            <li>
                <Link to={props.path} className="nav-link px-2 text-dark">{props.text}</Link>
            </li>
        );
    }

    return (
        <header className="p-3 text-bg-light">
            <div className="container">
                <div
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                        Cryptocurrencies
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <NavbarItem text="Tweet" path="/feed"/>
                        <NavbarItem text="Blog" path="/blog"/>
                    </ul>

                    <div className="text-end">
                        {handleAuthButtons()}
                    </div>
                </div>
            </div>
        </header>
    );

}

export default Navbar;