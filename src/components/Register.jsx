import React, {useState} from "react";
import axios from "axios";
import {setUserData} from "../features/user/user-slice";
import {useDispatch} from "react-redux";

const Register = () => {

    const state = {
        name: '',
        email: '',
        password: '',
    };

    const [user, setUser] = useState(state);
    const dispatch = useDispatch();

    /**
     * handle form inputs
     * @param event
     */
    const handleName = (event) => {
        setUser({...user, name: event.target.value});
    }

    const handleEmail = (event) => {
        setUser({...user, email: event.target.value});
    }

    const handlePassword = (event) => {
        setUser({...user, password: event.target.value});
    }

    /**
     * register user
     * required:
     * @email
     * @password
     */
    const handleRegister = async () => {

        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const path = "/auth/register";


        // Create user with email and pass.
        try{
            const response =
                await axios.post(baseUrl + path, {
                    "name": name,
                    "email": email,
                    "password": password
                });

            //set the tokens in local storage
            //change to redis when needed.
            localStorage.setItem("accessToken", user.data.accessToken);
            localStorage.setItem("refreshToken", user.data.refreshToken);

            dispatch(setUserData(response.data));

       //catch the error
        }catch (err){
            console.log(err.message);
        }

    }

    return (
        <main className="form-signin w-100 m-auto mt-5" style={{maxWidth: "330px"}}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="registerName"
                           placeholder="John Doe"
                           value={state.name}
                           onChange={handleName}
                    />
                    <label htmlFor="registerName">Name</label>
                </div>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput"
                           placeholder="name@example.com"
                           value={state.email}
                           onChange={handleEmail}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"
                           placeholder="Password"
                           value={state.password}
                           onChange={handlePassword}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button type="button"
                        className="w-100 btn btn-lg btn-primary"
                        onClick={handleRegister}>Register</button>
            </form>
        </main>
    );

}

export default Register;