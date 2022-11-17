import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class Register extends Component {

    handleRegister = () => {

        // Create user with email and pass.
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            });
    }

    render() {

        return (
            <main className="form-signin w-100 m-auto">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="registerName"
                               placeholder="John Doe" />
                        <label htmlFor="registerName">Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    <p className="mt-5 mb-3 text-danger">@ I Support Ukraine 2022</p>
                </form>
            </main>
        );

    }
}