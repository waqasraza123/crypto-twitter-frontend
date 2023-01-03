import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthStateContext} from "../../context/context";
import moment from "moment/moment";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";

const SinglePost = (props) => {

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
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
    const getPost = async (postId) => {
        try{
            const response = await axios.get(url + path + postId, {
                headers: { "Authorization": "Bearer " + token }
            })
            setPost(response.data.post)
        }catch (error){ console.log(error) }
    }


    /**
     * get the comments of this post
     * @returns {Promise<void>}
     */
    const getComments = async () => {
        const commentsPath = "/api/comments/post/" + id + "/" + postType

        try{
            const response = await axios.get(url + commentsPath, {
                headers: { "Authorization": "Bearer " + token }
            })

            //set comments
            setComments(response.data.comments)
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getPost(id).catch(error => console.log(error))
        getComments().catch(error => console.log(error))
    }, [])

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
                            href="#">{post.author.name}</a></p>
                        <p>{post.content}</p>
                    </article>
                    <div className="commentForm">
                        <CommentForm post={post} type="blogs" setComments={setComments} />
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