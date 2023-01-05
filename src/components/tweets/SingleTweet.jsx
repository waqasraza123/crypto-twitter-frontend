import React, {useContext, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";
import {AuthStateContext} from "../../context/context";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";
import UserInfo from "../partials/UserInfo";
import LoadingIcon from "../partials/LoadingIcon";

const SingleTweet = () => {

    const url = process.env.REACT_APP_BASE_API_URL
    const {id} = useParams()
    const token = useContext(AuthStateContext).token
    const [tweetComments, setTweetComments] = useState([])
    const postType = "tweets"


    async function getTweet(){
        const path = "/api/tweet/" + id;
        try{
            const response = await axios.get(url + path, {
                headers:{"Authorization": "Bearer " + token}
            })
            const tweet = response?.data?.tweet
            setTweetComments(tweet.comments)
            return tweet
        }catch (error){
            return error;
        }
    }

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["tweet"],
        queryFn: getTweet
    })

    if(isLoading){
        return (
            <LoadingIcon />
        )
    }

    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    return (
        <div className="single-post-page">
            <UserInfo item={data} />
            <p className="col offset-2 fs-4 text-wrap text-break">{data.tweet}</p>
            <CommentForm post={data} type={postType} setComments={setTweetComments} />
            <h1 className="text-center">Previous Comments</h1>

            {
                Object.keys(tweetComments).length > 0 ?
                    tweetComments.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                }) : <p className="text-center">Nothing to be found here.</p>
            }
        </div>
    )
}

export default SingleTweet