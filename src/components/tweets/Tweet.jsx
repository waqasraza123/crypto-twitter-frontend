import React, {useContext, useEffect, useState} from "react";
import UserInfo from "../partials/UserInfo";
import CommentForm from "../comments/CommentForm";
import {AuthStateContext} from "../../context/context";
import Comment from "../comments/Comment";
import {toast} from "react-toastify";
import axios from "axios";

const Tweet = ({tweet, tweetComments}) => {

    const [likedObject, setLikedObject] = useState({liked: false, classes: "btn-warning"})
    const [comments, setComments] = useState([])
    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL
    const postType = "tweets"

    useEffect(() => {

        //set the like status for current user && current tweet
        tweet?.liked_by_current_user === null ?
            setLikedObject({classes: "btn-warning", liked: false}):
            setLikedObject({classes: "btn-success", liked: true})

        setComments(tweetComments)
    }, [])


    /**
     * save the like to db
     */
    async function handleLikeAction(){

        const path = "/api/likes"

        try {
            const response = await axios.post(url + path, {tweet_id: tweet.id},{
                headers:{"Authorization": "Bearer " + token}
            })

            //show toast message
            response?.data?.message && toast.success(response?.data?.message)

            //set liked object
            const liked = response?.data?.liked
            liked === true ? setLikedObject({classes: "btn-success", liked: true}):
                setLikedObject({classes: "btn-warning", liked: false})

        }catch (error){
            //toggle the liked status between false/true
            //toggle the liked status between false/true
            setLikedObject({classes: "btn-warning", liked: false})
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
                <button className={"btn btn-sm mx-1 " + likedObject.classes}
                        onClick={handleLikeAction}
                        type="button">{likedObject.liked === true ? "Liked" : "Like"}</button>
                <button className="btn btn-warning btn-sm mx-1" type="button">Show Thread</button>
            </div>
        </div>
    );
}

export default Tweet;