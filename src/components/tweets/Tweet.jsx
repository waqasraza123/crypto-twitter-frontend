import React, {useContext, useEffect, useState} from "react";
import UserInfo from "../partials/UserInfo";
import CommentForm from "../comments/CommentForm";
import {AuthStateContext} from "../../context/context";
import axios from "axios";
import Comment from "../comments/Comment";

const Tweet = ({tweet}) => {

    const path = "/api/likes"
    const url = process.env.REACT_APP_BASE_API_URL
    const [comments, setComments] = useState([])
    const [likedButtonText, setLikeButtonText] = useState("Like")
    const [likeButtonClasses, setLikeButtonClasses] = useState("btn-warning")
    const postType = "tweets"
    const id = tweet.id
    const token = useContext(AuthStateContext).token

    useEffect(() => {
        getComments().catch(error => console.log(error))
    }, [])

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
        }catch (error){ console.log(error) }
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async function handleLikeAction(){

        //update the button state
        setLikeButtonText("Liked")
        setLikeButtonClasses("btn-success")

        try {
            const response = await axios.post(url + path, {
            })

            if(response){
                console.log(response)
            }

        }catch (error){
            console.log(error.message)
        }
    }

    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <UserInfo item={tweet} />
            <div className="container-fluid py-2">
                <p className="col fs-4 text-wrap text-break">{tweet.tweet}</p>
                <div className="comment mb-5">
                    <CommentForm post={tweet} type={postType} setComments={setComments} />
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
                <button className="btn btn-warning btn-sm mx-1" type="button">Comment</button>
                <button className={"btn btn-sm mx-1 " + likeButtonClasses}
                        onClick={handleLikeAction}
                        type="button">{likedButtonText}</button>
                <button className="btn btn-warning btn-sm mx-1" type="button">Show Thread</button>
            </div>
        </div>
    );
}

export default Tweet;