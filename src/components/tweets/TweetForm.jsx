import React, {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "../SearchBar";

const TweetForm = ({setFeed}) => {

    const [tweet, setTweet] = useState("");
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/tweets"
    const userId = 1

    async function saveTweet(e){
        e.preventDefault();

        //call the api to save tweet
        try {
            const response = await axios.post(url + path, {
                "content": tweet,
                "userId": userId
            })

            //tweet is saved
            toast.success(response.data.message)
            //update feed state
            setFeed(prev => {
                return [response.data.tweet, ...prev]
            })
            //update state
            setTweet("")

        }catch (error){
            toast.error(error.message)
        }
    }

    return(
        <>
            <ToastContainer/>
            <SearchBar />
            <form className="tweet-form" onSubmit={(e) => saveTweet(e)}>
                <textarea className="form-control"
                    value={tweet} rows={5}
                    placeholder="Tweet about your day..."
                    onChange={(e) => setTweet(e.target.value)}/>
                <button className="btn btn-success mt-2 btn-sm">tweet</button>
            </form>
        </>
    )
}

export default TweetForm;