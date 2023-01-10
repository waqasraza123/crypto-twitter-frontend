import React from "react"
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";
import LoadingIcon from "../partials/LoadingIcon";
import usePost from "../../hooks/blog/usePost";

const SinglePost = () => {

    const { id } = useParams()
    const postType = "blogs"

    const {isLoading, isError, error, data, refetch} = usePost(id)

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

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

export default SinglePost