import React, {useContext, useEffect, useState} from "react";
import {AuthStateContext} from "../../context/context";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TweetForm from "./TweetForm";
import Tweet from "./Tweet";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import LoadingIcon from "../partials/LoadingIcon";

const Feed = () => {

    const [feed, setFeed] = useState([])

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/tweets"
    const token = useContext(AuthStateContext).token

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["tweets"],
        queryFn: getTweets
    })

    async function getTweets(){
        try{
            const response = await axios.get(url + path, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            })

            //update state
            const tweets = response?.data?.tweets
            setFeed(tweets)
            console.log(response)
            return tweets

        }catch (error){
            toast.error(error.message)
            return error
        }
    }

    if(isLoading){
        return <LoadingIcon />
    }

    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    return(
        <>
            <ToastContainer />
            <TweetForm setFeed={setFeed} />
            {
                feed.map(tweet => {
                    return (<Tweet tweet={tweet} tweetComments={tweet.comments} key={tweet.id} />)
                })
            }
        </>
    )
}

export default Feed;