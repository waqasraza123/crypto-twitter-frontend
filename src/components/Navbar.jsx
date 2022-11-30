import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {

    const user = useSelector(state => state.user);

    //normal function
    //returns other components conditionally
    function handleAuthButtons() {

        if(user.isLoggedIn){
            return <ProfileButton user={user} />
        }else{
            return <AuthButtons />
        }
    }

    //functional component
    function ProfileButton(props){
        return (
            <button className="btn btn-outline-success btn-success">
                <Link className="text-decoration-none text-white" to="/profile">{props.user.name || "Profile"}</Link>
            </button>
        );
    }

    //functional component
    function AuthButtons(){
        return (
            <>
                <button type="button" className="btn btn-outline-light me-2">
                    <Link className="text-decoration-none" to="/login">Login</Link>
                </button>
                <button type="button" className="btn btn-primary me-2">
                    <Link className="text-decoration-none text-white" to="/register">Register</Link>
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
                        Latest Tweets
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <NavbarItem text="Crypto" path="/listings"/>
                        <NavbarItem text="Blog" path="/blog"/>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" className="form-control form-control-dark text-bg-dark"
                               placeholder="Search..." aria-label="Search" />
                    </form>

                    <div className="text-end">
                        {handleAuthButtons()}
                    </div>
                </div>
            </div>
        </header>
    );

}

export default Navbar;