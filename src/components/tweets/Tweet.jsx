import React from "react";

const Tweet = ({tweet}) => {
    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <div className="container-fluid py-2">
                <p className="col">{tweet.content}</p>
                <button className="btn btn-primary btn-sm" type="button">Show Thread</button>
                <p className="text-muted fs-0.2 mt-2">Posted @ {tweet.createdAt}</p>
            </div>
        </div>
    );
}

export default Tweet;