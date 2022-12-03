import React, {useEffect, useState} from "react";
import PostForm from "./blog/PostForm";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import Post from "./blog/Post";


//top level component for blog
const Blog = () => {

    const [posts, setPosts] = useState([])
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/posts"
    const userId = JSON.parse(localStorage.getItem("user"))._id

    //on mount
    useEffect(() => {

        const getPosts = async () => {
            const response = await axios.get(url + path, {
                params: {
                    userId: userId,
                }
            })

            //set posts and merge with current
            setPosts(response.data)
        }

        //call the function
        getPosts().catch(error => toast.error(error.message))

    }, []) //runs on mount

    return (
        <div className="container">
            <ToastContainer />
            <div className="row">
                <div className="col"></div>
                <div className="col-6">
                    <PostForm setPosts={setPosts} />
                    <div className="my-2">
                        {
                            posts.map(post => {
                                return <Post key={post._id} post={post} />
                            })
                        }
                    </div>
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}

export default Blog;