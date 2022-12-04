import React, {useState} from "react"
import axios from "axios";

const ProfileForm = ({user}) => {

    const initialState = {
        "name": user.name || "",
        "email": user.email || "",
        "username": user.username || "",
        "bio": user.bio || ""
    }

    const [state, setState] = useState(initialState)
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/users/user"
    const formData = new FormData()

    function handleInputChange(event){
        const {name, value} = event.target

        setState(prevState => {
            return {...prevState, [name]: value}
        })
    }

    //handle file input
    function handleFileChange(e){
        formData.append(e.target.name, e.target.files[0])
    }

    //form submit
    async function handleSubmit(event){
        event.preventDefault()

        //append the values to formData
        for(const item in state){
            formData.append(item, state[item])
        }

        //send axios request to server
        try {
            const response = await axios.post(url + path, formData)
            if (response){
                console.log(response)
            }
        //handle errors
        }catch (error){
            console.log(error.message)
        }

    }

    return(
        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="name"
                    onChange={(e) => handleInputChange(e)}
                    value={state.name} />
                <label className="form-label">Name</label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" name="username"
                    value={state.username}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Enter username"/>
                <label className="form-label">Username</label>
            </div>

            <div className="form-floating mb-3">
                <textarea type="text" className="form-control" name="bio"
                    value={state.bio} rows="10"
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Write about your interests and passion"/>
                <label className="form-label">Bio</label>
            </div>

            <div className="form-floating mb-3">
                <input type="email" className="form-control"
                    name="email"
                    onChange={(e) => handleInputChange(e)}
                    value={state.email} />
                <label className="form-label">Email</label>
            </div>

            <div className="form-floating mb-3">
                <input type="file" className="form-control" name="photo"
                    onChange={handleFileChange}
                    value={state.photo} />
                <label>Photo</label>
            </div>

            <button className="btn btn-primary">Update Profile</button>
        </form>
    )
}

export default ProfileForm