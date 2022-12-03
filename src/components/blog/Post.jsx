import React from "react";
import moment from "moment";

const Post = ({post}) => {

    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <p>{post.author.name} - <span>Posted {moment(post.createdAt).fromNow()}</span></p>
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{post.title}</h1>
                <p className="col-md-8 fs-4">{post.content}</p>
                <button className="btn btn-primary btn-lg" type="button">Read More</button>
            </div>
        </div>
    );
}

export default Post;