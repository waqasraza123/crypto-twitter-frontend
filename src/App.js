import React, {Component} from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Cryptocurrency from "./components/Cryptocurrency";
import Footer from "./components/Footer";
import Profile from "./components/profile/Profile";
import Blog from "./components/Blog";
import {AuthProvider} from "./context";
import SinglePost from "./components/blog/SinglePost";
import BlogLayout from "./components/layout/BlogLayout";
import Feed from "./components/tweets/Feed";
import GithubLogin from "./components/socialLogin/GithubLogin";
import GoogleLogin from "./components/socialLogin/GoogleLogin";

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
                        <Route path="auth/callback/github" element={ <GithubLogin /> } />
                        <Route path="auth/callback/google" element={ <GoogleLogin /> } />

                        <Route element={ <ProtectedRoutes /> }>
                            <Route path="/" element={ <Cryptocurrency /> }></Route>

                            <Route path="/profile" element={ <Profile /> } />

                            <Route element={<BlogLayout />} >
                                <Route path="blog" element={ <Blog /> } />
                                <Route path="blog/post/:id" element={ <SinglePost /> } />

                                <Route path="/feed" element={ <Feed /> } />
                            </Route>

                        </Route>

                    </Routes>

                    <Footer />
                </div>
            </AuthProvider>
        );
    }

}
