import React, {useReducer} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

const REDUCER_ACTIONS = {
    "UPDATE_NAME": "updateName",
    "UPDATE_EMAIL": "updateEmail",
    "UPDATE_PASSWORD": "updatePassword",
    "UPDATE_USERNAME": "updateUsername"
}

const Register = () => {

    const navigate = useNavigate()
    const initialState = {
        name: '',
        email: '',
        username: '',
        password: '',
    };

    const [state, dispatch] = useReducer(reducer, initialState)

    function reducer(initialState, action){
        switch (action.type){
            case REDUCER_ACTIONS.UPDATE_NAME:
                return {
                    ...initialState,
                    name: action.payload
                }
            case REDUCER_ACTIONS.UPDATE_EMAIL:
                return {
                    ...initialState,
                    email: action.payload
                }
            case REDUCER_ACTIONS.UPDATE_PASSWORD:
                return {
                    ...initialState,
                    password: action.payload
                }
            case REDUCER_ACTIONS.UPDATE_USERNAME:
                return {
                    ...initialState,
                    username: action.payload
                }
            default:
                return "Action not handled."
        }
    }

    function setName(e){
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_NAME,
            payload: e.target.value
        })
    }

    function setEmail(e){
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_EMAIL,
            payload: e.target.value
        })
    }

    function setPassword(e){
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_PASSWORD,
            payload: e.target.value
        })
    }

    function setUsername(e){
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_USERNAME,
            payload: e.target.value
        })
    }

    /**
     * register user
     * required:
     * @email
     * @password
     */
    const handleRegister = async () => {

        const name = state.name;
        const email = state.email;
        const password = state.password;
        const username = state.username;
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const path = "/api/register";


        // Create user with email and pass.
        try{
            //make request to fetch the data
            const response =
                await axios.post(baseUrl + path, {
                    "name": name,
                    "email": email,
                    "username": username,
                    "password": password
                });

            if(response && response.message){
                toast.error(response.message)
            }else{
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success("Successfully Registered!")
                navigate("/")
            }

       //catch the error
        }catch (err){
            const validationFailedMessages = err.response.data.errors
            for (let key in validationFailedMessages) {
                toast.error(validationFailedMessages[key][0])
            }
        }

    }

    return (
        <>
            <ToastContainer />
            <main className="form-signin w-100 m-auto mt-5" style={{maxWidth: "330px"}}>
                <form>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control"
                               placeholder="John Doe"
                               value={state.name}
                               onChange={(e) => setName(e)}
                        />
                        <label htmlFor="registerName">Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="text" className="form-control"
                               placeholder="Username"
                               value={state.username}
                               onChange={(e) => setUsername(e)}
                        />
                        <label>Username</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control"
                               placeholder="name@example.com"
                               value={state.email}
                               onChange={(e) => setEmail(e)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control"
                               value={state.password}
                               onChange={(e) => setPassword(e)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button type="button"
                            className="w-100 btn btn-lg btn-primary"
                            onClick={handleRegister}>Register</button>
                </form>
            </main>
        </>
    );

}

export default Register;