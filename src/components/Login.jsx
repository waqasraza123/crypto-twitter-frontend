import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserData} from "../features/user/user-slice";

const Login = () => {

    const state = {
        email: "",
        password: "",
        isLoggedIn: false
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState(state);

    /**
     * handle form inputs
     * @param event
     */
    function setEmail (event) {
        setUser({...user, email: event.target.value});
    }

    function HandlePassword(event) {
        setUser({...user, password: event.target.value});
    }


    /**
     * login user
     * required:
     * @email
     * @password
     */
    const HandleLogin = async () => {

        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const path = "/auth/login";

        try{
            const response = await axios.post(baseUrl + path,
                {
                    "email": user.email,
                    "password": user.password
                }
            );

            //save the accessToken on localstorage
            if(response){
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("email", response.data.email);
                response.data.isLoggedIn = true;
            }

            //set the user data in redux state
            //adding the main data which is shared across components and
            //needs to update automatically without any page reload or action by user.
            dispatch(setUserData(response.data));

        }catch (err){
            console.log(err.message);
        }

    }

    return (
        <main className="form-signin w-100 m-auto mt-5" style={{maxWidth: "330px"}}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput"
                           value={user.email}
                           onChange={(event) => setEmail(event)}
                           placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"
                           value={user.password}
                           onChange={(event) => HandlePassword(event)}
                           placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary"
                        onClick={() => HandleLogin()}
                        type="button">Sign in</button>
            </form>

            <button type="button" className="btn btn-warning mt-2">
                <Link className="text-decoration-none" to="/register">Sign-up</Link>
            </button>

        </main>
    );

}

export default Login;