import React, {useEffect, useState} from "react";
import TweetForm from "./TweetForm";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Tweet from "./Tweet";

const Feed = () => {

    const [feed, setFeed] = useState([])

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/tweets"
    const userId = 1

    useEffect(() => {

        async function getTweets(){
            try{
                const response = await axios.get(url + path, {
                    params: {
                        "userId" :userId
                    }
                })

                //update state
                console.log(response.data)
                setFeed(response.data)

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