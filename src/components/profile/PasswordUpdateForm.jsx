import React, {useContext, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import {AuthStateContext} from "../../context/context";

const PasswordUpdateForm = () => {

    const initialState = {
        password: "",
        password_confirmation: "",
        oldPassword: ""
    }

    const [state, setState] = useState(initialState)
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/user-profile/password"
    const token = useContext(AuthStateContext).token

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
                "password_confirmation": state.password_confirmation
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (response){
                console.log(response)
                //reset state
                setState(initialState)

                //show success toast
                toast.success(response.data.message)
            }

        }catch (error){
            console.log(error)
            const validationFailedMessages = error.response.data.errors
            for (let key in validationFailedMessages) {
                toast.error(validationFailedMessages[key][0])
            }
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
                    <input type="password" className="form-control" name="password_confirmation"
                           onChange={(e) => handleInputChange(e)}
                           value={state.password_confirmation} />
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