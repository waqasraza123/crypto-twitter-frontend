import React, {useContext, useEffect, useState} from "react";
import {AuthStateContext} from "../../context/context";
import UserInfo from "../partials/UserInfo";
import {toast} from "react-toastify";
import axios from "axios";
import {Link} from "react-router-dom";

const Tweet = ({tweet}) => {

    const [likedObject, setLikedObject] = useState(
        {
            liked: false,
            classes: "btn-warning"
        })
    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL

    useEffect(() => {

        //set the like status for current user && current tweet
        tweet?.liked_by_current_user === false ?
            setLikedObject({classes: "btn-warning", liked: false}):
            setLikedObject({classes: "btn-success", liked: true})

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
            setLikedObject({classes: "btn-warning", liked: false})
            console.log(error.message)
        }
    }

    return(
        // <Link to={`/tweet/${tweet.id}`}>
            <div className="p-5 mb-4 mt-4 bg-light rounded-3">
                <UserInfo item={tweet} />
                <div className="container-fluid py-2">
                    <p className="col fs-4 offset-2 text-wrap text-break">{tweet.tweet}</p>
                    <div className="offset-2 tweet-buttons">
                        <button className="btn btn-warning btn-sm mx-1" type="button">Comment {tweet.comments_count}</button>
                        <button className={"btn btn-sm mx-1 " + likedObject.classes}
                                onClick={handleLikeAction}
                                type="button">{likedObject.liked === true ? "Liked" : "Like"}
                                {" " + tweet.likes_count}
                        </button>
                        <Link to={`/tweet/${tweet.id}`}>
                            <button className="btn btn-warning btn-sm mx-1" type="button">Show Thread</button>
                        </Link>
                    </div>
                </div>
            </div>
        //</Link>
    );
}

export default Tweet;