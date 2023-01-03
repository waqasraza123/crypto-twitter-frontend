import React from "react";
import moment from "moment/moment";

const Comment = ({comment}) => {

    return (
        <div className="row">
            <div className="col-3">
                <a href="#"><p className="postedBy">{comment.user.name}:</p></a>
                <p className="postedAt" style={{fontSize: "0.5rem"}}>{moment(comment.created_at).fromNow()}</p>
            </div>
            <div className="col-9">
                <p className="text-danger ms-2">{comment.comment}</p>
            </div>
        </div>
    )
}

export default Comment;