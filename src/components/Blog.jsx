import React, {useContext, useState} from "react";
import PostForm from "./blog/PostForm";
import axios from "axios";
import Post from "./blog/Post";
import {AuthStateContext} from "../context/context";
import {useQuery} from "@tanstack/react-query";
import LoadingIcon, {ColorRingLoadingIcon} from "./partials/LoadingIcon";
import {toast} from "react-toastify";
import PaginationClassic from "./partials/PaginationClassic";

//top level component for blog
const Blog = () => {

    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/blog/posts"
    const [pageParam, setPageParam] = useState(1)

    //call the api
    const getPosts = async () => {
        try{
            const response = await axios.get(url + path + "?page=" + pageParam, {
                headers: {"Authorization": "Bearer " + token}
            })
            return response?.data
        }catch (error) {return error}
    }

    //get the data from the api using react query
    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery({
        queryKey: ["blogPosts", pageParam],
        queryFn: () => getPosts(pageParam)
    })

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        toast.error(error.message)
    }

    if(isSuccess){console.log(data)}

    //data returned successfully
    return (
        <div>
            <PostForm refetchPosts={refetch} />
            <div>
                {
                    data?.data?.length ? data.data.map(post => {
                        return <Post key={post.id} post={post} />
                    }) : <ColorRingLoadingIcon />
                }
            </div>
            <PaginationClassic paginatedObject={data} onClickFunction={(pageNumber) => {console.log(pageNumber); setPageParam(pageNumber)}} />
        </div>
    );
}

export default Blog;