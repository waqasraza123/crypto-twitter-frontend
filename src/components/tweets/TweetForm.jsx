import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "../SearchBar";
import {AuthStateContext} from "../../context/context";

const TweetForm = ({setFeed}) => {

    const [tweet, setTweet] = useState("");
    const [characterCount, setCharacterCount] = useState(0)
    const [textAreaClasses, setTextAreaClasses] = useState("")
    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/tweet"
    const characterLimit = 100

    async function saveTweet(e){
        e.preventDefault();

        //call the api to save tweet
        try {
            const response = await axios.post(url + path, {
                "tweet": tweet,
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            //tweet is saved
            toast.success(response.data.message)
            console.log(response)
            //update feed state
            setFeed(prev => {
                return [response.data.tweet, ...prev]
            })
            //update state
            setTweet("")
            setCharacterCount(0)

        }catch (error){
            const validationFailedMessages = error.response.data.errors
            for (let key in validationFailedMessages) {
                toast.error(validationFailedMessages[key][0])
            }
        }
    }

    function handleChange(e){
        setTweet(e.target.value)
        setCharacterCount(e.target.value.length)

        if(e.target.value.length > 100){
            setTextAreaClasses("border border-danger border-5")
        }else{
            setTextAreaClasses("")
        }
    }

    return(
        <>
            <ToastContainer />
            <SearchBar />
            <form className="tweet-form" onSubmit={(e) => saveTweet(e)}>
                <textarea className={textAreaClasses + " form-control"}
                    value={tweet} rows={5}
                    placeholder="Tweet about your day..."
                    onChange={(e) => handleChange(e)}/>
                <p className="text-right">{characterLimit - characterCount} characters left.</p>
                <button className="btn btn-success mt-2 btn-sm">tweet</button>
            </form>
        </>
    )
}

export default TweetForm;