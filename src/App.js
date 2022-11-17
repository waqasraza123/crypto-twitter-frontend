import React, {Component} from "react";
import ReactDOM from "react-dom";
import Login from "./components/login";
import Register from "./components/register";


/**
 * constants and variables
 * @type {string}
 */
const classes = "container";
const isLoggedIn = false;
const isRegistered = true;
/**
 * Root level component to host all the
 * child components
 */
export default class App extends Component {

    render() {
        return (
        <div className={classes}>
            { isRegistered === false ? <Register /> : <Login /> }
        </div>
        );
    }
}
