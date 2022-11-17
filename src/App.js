import React, {Component} from "react";
import ReactDOM from "react-dom";
import Login from "./components/login";
import Register from "./components/register";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


/**
 * constants and variables
 * @type {string}
 */
const firebaseConfig = {
    apiKey: "AIzaSyCnJoo_GOA6xi0wW1lDHov8q6S2MXQzhxY",
    authDomain: "mini-crypto-exchange.firebaseapp.com",
    projectId: "mini-crypto-exchange",
    storageBucket: "mini-crypto-exchange.appspot.com",
    messagingSenderId: "99731464066",
    appId: "1:99731464066:web:4d66fa6b96f10b460a399b",
    measurementId: "G-W100XS8G2T"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const classes = "container";
const isLoggedIn = false;
const isRegistered = false;
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
