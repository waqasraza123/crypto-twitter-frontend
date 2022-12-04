import React, {useState} from "react";

const PasswordUpdateForm = () => {

    const initialState = {
        password: "",
        confirmPassword: "",
        oldPassword: ""
    }

    const [state, setState] = useState(initialState)

    function handleInputChange(e){
        const {name, value} = e.target

        return setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    return(
        <>
            <h4 className="mt-5">Update Password</h4>

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
        </>
    )
}

export default PasswordUpdateForm