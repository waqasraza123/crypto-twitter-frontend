import React, {useContext, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthStateContext} from "../../context/context";
import moment from "moment/moment";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";
import {useQuery} from "react-query";
import LoadingIcon from "../partials/LoadingIcon";

const SinglePost = () => {

    const [comments, setComments] = useState([])
    const token = useContext(AuthStateContext).token
    const [post, setPost] = useState({})
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
            setPost(response.data.post)
            response?.data?.post?.comments ? setComments(response.data.post.comments) : setComments([])
        }catch (error){ console.log(error) }
    }

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["singlePost"],
        queryFn: () => getPost(id)
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
        <>
            {
                Object.keys(post).length === 0 ?
                "Loading Content"
                :
                <div>
                    <article className="blog-post">
                        <h2 className="blog-post-title mb-1">{post.title}</h2>
                        <p className="blog-post-meta">{moment(post.created_at).format("LLLL")} by <a
                            href="#">{post.user.name}</a></p>
                        <p>{post.content}</p>
                    </article>
                    <div className="commentForm">
                        <CommentForm post={post} type={postType} setComments={setComments} />
                        <h1 className="text-center">Previous Comments</h1>
                        {
                            Object.keys(comments).length > 0 ?
                                comments.map(comment => {
                                    return <Comment key={comment.id} comment={comment} />
                                })
                                :
                                <p className="text-center">"No comments..."</p>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SinglePost