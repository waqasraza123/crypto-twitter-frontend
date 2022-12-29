import React, {useContext, useState} from "react";
import UserInfo from "../partials/UserInfo";
import axios from "axios";
import {AuthStateContext} from "../../context/context";

const Tweet = ({tweet}) => {

    const user = useContext(AuthStateContext).userDetails
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/likes"
    const [likedButtonText, setLikeButtonText] = useState("Like")
    const [likeButtonClasses, setLikeButtonClasses] = useState("btn-warning")

    async function handleLikeAction(){
        const authorId = user._id
        const tweetId = tweet._id


        //update the button state
        setLikeButtonText("Liked")
        setLikeButtonClasses("btn-success")

        try {
            const response = await axios.post(url + path, {
                tweetId: tweetId,
                authorId: authorId,
            })

            if(response){
                console.log(response)
            }

        }catch (error){
            console.log(error.message)
        }
    }

    function handleComment(e){
        e.preventDefault()
    }

    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <UserInfo item={tweet} />
            <div className="container-fluid py-2">
                <p className="col fs-4 text-wrap text-break">{tweet.tweet}</p>
                <div className="comment mb-5">
                    <form onSubmit={handleComment}>
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <input type="text" name="comment" className="form-control" placeholder="type your comment..."/>
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary btn-sm">comment</button>
                                </div>
                            </div>
                        </div>
                    </form>
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