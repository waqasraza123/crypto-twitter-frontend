import React, {useContext, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthStateContext} from "../../context/context";
import moment from "moment/moment";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";
import {useQuery} from "@tanstack/react-query";
import LoadingIcon from "../partials/LoadingIcon";

const SinglePost = () => {

    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/blog/post/"
    const { id } = useParams()
    const postType = "blogs"

    /**
     * get current post
     * @param postId
     * @returns {Promise<void>}
     */
    async function getPost(postId){
        try{
            const response = await axios.get(url + path + postId, {
                headers: { "Authorization": "Bearer " + token }
            })
            const post = response?.data?.post
            return post
        }catch (error){ return error }
    }

    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery({
        queryKey: ["singlePost", id],
        queryFn: () => getPost(id),
    })

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    if(isSuccess){
        return (
            <div>
                <article className="blog-post">
                    <h2 className="blog-post-title mb-1">{data.title}</h2>
                    <p className="blog-post-meta">{moment(data.created_at).format("LLLL")} by <a
                        href="#">{data.user.name}</a></p>
                    <p>{data.content}</p>
                </article>
                <div className="commentForm">
                    <CommentForm post={data} type={postType} refetchComments={refetch} />
                    <h1 className="text-center">Previous Comments</h1>
                    {
                        Object.keys(data?.comments).length > 0 ?
                            data?.comments.map(comment => {
                                return <Comment key={comment.id} comment={comment} />
                            })
                            :
                            <p className="text-center">"No comments..."</p>
                    }
                </div>
            </div>
        )
    }
}

export default SinglePost