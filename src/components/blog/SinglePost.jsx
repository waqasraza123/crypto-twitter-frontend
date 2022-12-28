import React, {useContext, useEffect, useState} from "react"
import axios from "axios";
import {useParams} from "react-router-dom";
import {AuthStateContext} from "../../context/context";
import moment from "moment/moment";

const SinglePost = (props) => {

    const [post, setPost] = useState({})
    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/blog/post/"
    const { id } = useParams()

    const getPost = async (postId) => {
        try{
            const response = await axios.get(url + path + postId, {
                headers: { "Authorization": "Bearer " + token }
            })

            setPost(response.data.post)

        }catch (error){
            console.log(error)
        }
    }

    //get the post
    useEffect(() => {
        getPost(id).catch(error => console.log(error))
    }, [])

    return (
        <>
            {
                Object.keys(post).length === 0 ?
                "Loading Content"
                :
                <article className="blog-post">
                    <h2 className="blog-post-title mb-1">{post.title}</h2>
                    <p className="blog-post-meta">{moment(post.created_at).format("LLLL")} by <a
                        href="#">{post.author.name}</a></p>
                    <p>{post.content}</p>
                </article>
            }
        </>
    )
}

export default SinglePost