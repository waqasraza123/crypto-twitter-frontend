import React, {useState} from "react";
import PostForm from "./blog/PostForm";
import Post from "./blog/Post";
import LoadingIcon, {ColorRingLoadingIcon} from "./partials/LoadingIcon";
import {toast} from "react-toastify";
import PaginationClassic from "./partials/PaginationClassic";
import usePosts from "../hooks/blog/usePosts";

//top level component for blog
const Blog = () => {

    const [pageParam, setPageParam] = useState(1)
    const {isLoading, isError, error, data, refetch} = usePosts(pageParam)

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        toast.error(error.message)
    }

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
            {
                data && <PaginationClassic paginatedObject={data} onClickFunction={(pageNumber) => {setPageParam(pageNumber)}} />
            }
        </div>
    );
}

export default Blog;