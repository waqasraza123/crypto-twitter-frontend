import React from "react";
import moment from "moment/moment";

const Tweet = ({tweet}) => {
    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <p>{tweet.author.name} - <span>Posted {moment(tweet.createdAt).fromNow()}</span></p>
            <div className="container-fluid py-2">
                <p className="col">{tweet.content}</p>
                <button className="btn btn-primary btn-sm" type="button">Show Thread</button>
            </div>
        </div>
    );
}

export default Tweet;