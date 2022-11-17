import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


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
export const auth = getAuth(app);