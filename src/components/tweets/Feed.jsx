import React, {useContext, useEffect, useState} from "react";
import TweetForm from "./TweetForm";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Tweet from "./Tweet";
import {AuthStateContext} from "../../context/context";

const Feed = () => {

    const [feed, setFeed] = useState([])

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/tweets"
    const token = useContext(AuthStateContext).token

    useEffect(() => {

        async function getTweets(){
            try{
                const response = await axios.get(url + path, {
                    headers:{
                        "Authorization": "Bearer " + token
                    }
                })

                //update state
                setFeed(response.data.tweets)
                console.log(response)

            }catch (error){
                toast.error(error.message)
            }
        }

        getTweets().catch(error => toast.error(error.message))

    }, [])//on mount

    return(
        <>
            <ToastContainer />
            <TweetForm setFeed={setFeed} />
            {
                feed.map((tweet, index) => {
                    return (<Tweet tweet={tweet} key={index} />)
                })
            }
        </>
    )
}

export default Feed;