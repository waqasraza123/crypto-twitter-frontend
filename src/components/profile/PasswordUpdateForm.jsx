import React, {useContext, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {AuthStateContext} from "../../context/context";

const PasswordUpdateForm = () => {

    const initialState = {
        password: "",
        confirmPassword: "",
        oldPassword: ""
    }

    const [state, setState] = useState(initialState)
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/users/password"
    const email = useContext(AuthStateContext).userDetails.email

    function handleInputChange(e){
        const {name, value} = e.target

        return setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const response = await axios.post(url + path, {
                "password": state.password,
                "oldPassword": state.oldPassword,
                "email": email
            })

            if (response){
                toast.success(response.data.message)
            }

        }catch (error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return(
        <>
            <ToastContainer />
            <h4 className="mt-5">Update Password</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="password"
                           onChange={(e) => handleInputChange(e)}
                           value={state.password} />
                    <label className="form-label">New Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="confirmPassword"
                           onChange={(e) => handleInputChange(e)}
                           value={state.confirmPassword} />
                    <label className="form-label">Confirm New Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="oldPassword"
                           onChange={(e) => handleInputChange(e)}
                           value={state.oldPassword} />
                    <label className="form-label">Old Password</label>
                </div>

                <button className="btn btn-warning">Update Password</button>
            </form>
        </>
    )
}

export default PasswordUpdateForm