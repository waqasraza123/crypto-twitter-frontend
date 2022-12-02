import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthDispatchContext} from "../context/context";
import {loginUser} from "../context";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //dispatch is used in reducers to update the state
    const authDispatchContext = useContext(AuthDispatchContext);
    const navigate = useNavigate()


    /**
     * login user
     * required:
     * @email
     * @password
     */
    const HandleLogin = async (e) => {
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
                            onClick={(e) => HandleLogin(e)}
                            type="button">Sign in</button>
                </form>

                <button type="button" className="btn btn-warning mt-2">
                    <Link className="text-decoration-none" to="/register">Sign-up</Link>
                </button>

            </main>
        </>
    );

}

export default Login;