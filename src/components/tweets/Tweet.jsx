import React from "react";
import UserInfo from "../partials/UserInfo";

const Tweet = ({tweet}) => {
    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <UserInfo item={tweet} />
            <div className="container-fluid py-2">
                <p className="col fs-4">{tweet.content}</p>
                <button className="btn btn-warning btn-sm mx-1" type="button">Comment</button>
                <button className="btn btn-warning btn-sm mx-1" type="button">Like</button>
                <button className="btn btn-warning btn-sm mx-1" type="button">Show Thread</button>
            </div>
        </div>
    );
}

export default Tweet;