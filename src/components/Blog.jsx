import React, {useContext, useEffect, useState} from "react";
import PostForm from "./blog/PostForm";
import axios from "axios";
import {toast} from "react-toastify";
import Post from "./blog/Post";
import {AuthStateContext} from "../context/context";

//top level component for blog
const Blog = () => {

    const [posts, setPosts] = useState([])
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/blog/posts"

    //on mount
    useEffect(() => {

        const getPosts = async () => {
            const response = await axios.get(url + path, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log(response)
            //set posts
            setPosts(response.data)
        }

        //call the function
        getPosts().catch(error => toast.error(error.message))

    }, []) //runs on mount


    return (
        <div>
            <PostForm setPosts={setPosts} />
            <div>
                {
                    posts.length ? posts.map(post => {
                        return <Post key={post.id} post={post} />
                    }) : "Loading"
                }
            </div>
        </div>
    );
}

export default Blog;