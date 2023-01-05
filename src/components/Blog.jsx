import React, {useContext, useState} from "react";
import PostForm from "./blog/PostForm";
import axios from "axios";
import Post from "./blog/Post";
import {AuthStateContext} from "../context/context";
import {useQuery} from "react-query";
import LoadingIcon from "./partials/LoadingIcon";

//top level component for blog
const Blog = () => {

    const [posts, setPosts] = useState([])
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/blog/posts"

    //call the api
    const getPosts = async () => {
        try{
            const response = await axios.get(url + path, {
                headers: {"Authorization": "Bearer " + token}
            })
            //set posts
            setPosts(response?.data)
            return response?.data
        }catch (error) {return error}
    }

    //get the data from the api using react query
    const {isLoading, isError, error, isSuccess, data} = useQuery({
        queryKey: ["blogPosts"],
        queryFn: getPosts
    })

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    //data returned successfully
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