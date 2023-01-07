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

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/tweets"
    const token = useContext(AuthStateContext).token
    const [pageParam, setPageParam] = useState(1)
    const [feed, setFeed] = useState([])

    const {
        isLoading,
        isError,
        error,
        isSuccess,
        data,
        refetch
    } = useQuery({
            queryKey: ["tweets", pageParam],
            queryFn: () => getTweets(pageParam)
    })

    async function getTweets(pageParam){
        try{
            const response = await axios.get(url + path + "?page=" + pageParam, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
            //update state
            const tweets = response?.data?.tweets
            return tweets

        }catch (error){
            return error
        }
    }

    //load more posts
    function loadMorePosts(e){
        e.preventDefault()

        setPageParam(data?.current_page + 1)
    }

    //query is fetching
    if(isLoading){
        return <LoadingIcon />
    }

    //failed to fetch the results
    if(isError){
        toast.error(error.message)
    }

    if(isSuccess){
        console.log(data)
    }

    return(
        <>
            <ToastContainer />
            <TweetForm refetchFeed={refetch} />
            {
                isSuccess && data?.data?.map(tweet => {
                    return <Tweet tweet={tweet} key={tweet.id} />
                })
            }
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={loadMorePosts}>Load More</button>
            </div>
        </>
    )
}

export default Feed;