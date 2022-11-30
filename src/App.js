import React, {Component} from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Cryptocurrency from "./components/Cryptocurrency";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Blog from "./components/Blog";
import Home from "./components/Home";


/**
 * variables
 *
 */
const isLoggedIn = true;
const isAdmin = true; //just for development purposes
/**
 * Root level component to host all the
 * child components
 */
export default class App extends Component {

    render() {
        return (
        <div className="root-container">
            <Navbar />
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="blog" element={ <Blog /> } />

                <Route element={ <ProtectedRoutes /> }>
                    <Route path="/profile" element={ <Profile /> } />
                    <Route path="/listings" element={ <Cryptocurrency /> } />
                </Route>

            </Routes>

            <Footer />
        </div>
        );
    }

}
