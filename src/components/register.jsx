import React, {Component} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

export default class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
    };

    /**
     * handle form inputs
     * @param event
     */
    handleName = (event) => {
        this.setState({name: event.target.value});
    }

    handleEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    /**
     * register user
     * required:
     * @email
     * @password
     */
    handleRegister = () => {

        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;



        // Create user with email and pass.
        createUserWithEmailAndPassword(auth, email, password)
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
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="registerName"
                               placeholder="John Doe"
                               value={this.state.name}
                               onChange={this.handleName}
                                />
                        <label htmlFor="registerName">Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               value={this.state.email}
                               onChange={this.handleEmail}
                                />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               value={this.state.password}
                               onChange={this.handlePassword}
                                />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button type="button"
                            className="w-100 btn btn-lg btn-primary"
                            onClick={this.handleRegister}>Register</button>
                </form>
            </main>
        );

    }
}