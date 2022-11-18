import React, {Component} from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
    render(){
        return (
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div
                        className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            Crypto World!
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li>
                                <Link to="/" className="nav-link px-2 text-secondary">Home</Link>
                            </li>
                            <li>
                                <Link to="/features" className="nav-link px-2 text-white">Features</Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="nav-link px-2 text-white">Pricing</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="nav-link px-2 text-white">FAQs</Link>
                            </li>
                            <li>
                                <Link to="/about" className="nav-link px-2 text-white">About</Link>
                            </li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" className="form-control form-control-dark text-bg-dark"
                                   placeholder="Search..." aria-label="Search" />
                        </form>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">
                                <Link className="text-decoration-none" to="/login">Login</Link>
                            </button>
                            <button type="button" className="btn btn-warning">
                                <Link className="text-decoration-none" to="/register">Sign-up</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}