import React, {Component} from "react";
import {auth} from "../firebase";
import {signInWithEmailAndPassword} from "firebase/auth";

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
    handleLogin = () => {

        const email = this.state.email;
        const password = this.state.password;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }


    render() {
        return (
            <main className="form-signin w-100 m-auto">
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
            </main>
        );
    }
}