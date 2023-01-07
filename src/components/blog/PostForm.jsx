import React, {useContext, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthStateContext} from "../../context/context";

const PostForm = ({refetchPosts}) => {

    const [title, setTitle] = useState("")
    const [postContent, setPostContent] = useState("")
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/blog/posts"
    const token = useContext(AuthStateContext).token

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const response = await axios.post(url + path, {
                title: title,
                content: postContent,
            },{
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            //post is saved
            toast.success("Post is saved!")
            //reset the state
            setTitle("")
            setPostContent("")
            console.log(response.data.post)

            //update posts state in parent and merge with new data
            refetchPosts()

        }catch (error){
            toast.error(error.message)
        }
    }


    return(
        <>
            <ToastContainer />
            <form className="post-form my-5" onSubmit={ (e) => handleSubmit(e)}>
                <div className="mb-3">
                    <input className="form-control"
                        name="title" value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                        placeholder="Post title..."
                    />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name="content"
                        rows="5"
                        value={postContent}
                        placeholder="Write a nice post..."
                        onChange={ (e) => setPostContent(e.target.value) }
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </>
    );

}

export default PostForm;