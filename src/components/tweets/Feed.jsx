import React, {useContext, useEffect, useState} from "react";
import {AuthStateContext} from "../../context/context";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TweetForm from "./TweetForm";
import Tweet from "./Tweet";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import LoadingIcon from "../partials/LoadingIcon";
import useTweets from "../../hooks/tweets/useTweets";

const Feed = () => {

    const [pageParam, setPageParam] = useState(1)
    const {isLoading, isError, error, data, isSuccess, refetch} = useTweets(pageParam)

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