import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Login extends Component {

    state = {
        email: '',
        password: '',
    }


    /**
     * handle form inputs
     * @param event
     */
    handleEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }


    /**
     * login user
     * required:
     * @email
     * @password
     */
    handleLogin = async () => {

        const email = this.state.email;
        const password = this.state.password;
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const path = "/auth/login";

        const user = await axios.post(baseUrl + path,
            {
            "email": email,
            "password": password
            }
        );

        //save the accessToken on localstorage
        if(user){
            localStorage.setItem("accessToken", user.data.accessToken);
            localStorage.setItem("name", user.data.name);
            localStorage.setItem("email", user.data.email);
        }
    }




    render() {
        return (
            <main className="form-signin w-100 m-auto mt-5" style={{maxWidth: "330px"}}>
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               value={this.state.email}
                               onChange={this.handleEmail}
                               placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               value={this.state.password}
                               onChange={this.handlePassword}
                               placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary"
                            onClick={this.handleLogin}
                            type="button">Sign in</button>
                </form>

                <button type="button" className="btn btn-warning mt-2">
                    <Link className="text-decoration-none" to="/register">Sign-up</Link>
                </button>

            </main>
        );
    }
}