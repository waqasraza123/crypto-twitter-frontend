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
import {AuthProvider} from "./context";

/**
 * Root level component to host all the
 * child components
 */
export default class App extends Component {

    render() {
        return (
            <AuthProvider>
                <div className="root-container">
                    <Navbar />
                    <Routes>
                        <Route path="login" element={ <Login /> } />
                        <Route path="register" element={ <Register /> } />

                        <Route element={ <ProtectedRoutes /> }>
                            <Route path="/" element={ <Home /> }></Route>
                            <Route path="blog" element={ <Blog /> } />
                            <Route path="/profile" element={ <Profile /> } />
                            <Route path="/listings" element={ <Cryptocurrency /> } />
                        </Route>

                    </Routes>

                    <Footer />
                </div>
            </AuthProvider>
        );
    }

}
