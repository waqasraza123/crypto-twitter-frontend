import React, {Component} from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Cryptocurrency from "./components/Cryptocurrency";
import Features from "./components/Features";
import Faq from "./components/Faq";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Blog from "./components/Blog";


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
                <Route path="/" element={ <h1>Home!</h1> }></Route>
                <Route path="login" element={ <Login /> } />
                <Route path="register" element={ <Register /> } />
                <Route path="pricing" element={ <Pricing /> } />
                <Route path="blog" element={ <Blog /> } />
                <Route path="faq" element={ <Faq /> } />
                <Route path="features" element={ <Features /> } />

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
