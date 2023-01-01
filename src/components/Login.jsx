import React, {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthDispatchContext} from "../context/context";
import {loginUser} from "../context";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [githubLoginUrl, setGithubLoginUrl] = useState("")

    //dispatch is used in reducers to update the state
    const authDispatchContext = useContext(AuthDispatchContext);
    const navigate = useNavigate()
    const url = process.env.REACT_APP_BASE_API_URL

    useEffect(() => {
        /**
         * returns github redirect url
         * @returns {Promise<void>}
         */
        async function getGithubLoginUrl(){
            const path = "/api/auth/redirect/github"
            try {
                const response = await axios.get(url + path)
                setGithubLoginUrl(response.data)
            }catch (error){console.log(error)}
        }

        getGithubLoginUrl().catch(error => console.log(error))
    }, [])

    /**
     * login user
     * required:
     * @email
     * @password
     */
    const handleLogin = async (e) => {
        e.preventDefault()

        const payload = {
            email: email,
            password: password
        }

        try{
            const response = await loginUser(authDispatchContext, payload)
            if (response){
                toast.success("Log in successful, Redirecting.")
                navigate("/")
            }

        }catch (error){
            toast.error(error.message)
        }
    }

    return (
        <>
            <ToastContainer />
            <main className="form-signin w-100 m-auto mt-5" style={{maxWidth: "330px"}}>
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary"
                            onClick={(e) => handleLogin(e)}
                            type="button">Sign in</button>
                </form>

                <button type="button" className="btn btn-warning mt-2 w-100">
                    <Link className="text-decoration-none" to="/register">Not a user? Sign-up Here</Link>
                </button>
                <p className="text-center my-2">OR</p>
                <a href={githubLoginUrl} className="w-100 btn btn-lg btn-secondary mt-2"
                   type="button">Login with GitHub</a>
            </main>
        </>
    );

}

export default Login;