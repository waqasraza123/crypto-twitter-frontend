import React, {Component} from "react";
import Login from "./components/login";
import Register from "./components/register";
import Navbar from "./components/navbar";
import Listings from "./components/listings";
import Features from "./components/features";
import About from "./components/about";
import FAQ from "./components/faq";
import Pricing from "./components/pricing";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoutes";
import Profile from "./components/profile";


/**
 * constants and variables
 *
 */
const isLoggedIn = true;
const isAdmin = true; //just for development purposes
/**
 * Root level component to host all the
 * child componentsmn
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
                <Route path="about" element={ <About /> } />
                <Route path="faq" element={ <FAQ /> } />
                <Route path="features" element={ <Features /> } />

                <Route element={ <ProtectedRoutes /> }>
                    <Route path="/profile" element={ <Profile /> } />
                    <Route path="/listings" element={ <Listings /> } />
                </Route>

            </Routes>

            <Footer />
        </div>
        );
    }

}
