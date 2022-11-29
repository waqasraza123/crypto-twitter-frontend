import React from "react";

const Post = ({title, content}) => {

    return(
        <div className="p-5 mb-4 mt-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">{title}</h1>
                <p className="col-md-8 fs-4">{content}</p>
                <button className="btn btn-primary btn-lg" type="button">Read More</button>
            </div>
        </div>
    );
}

export default Post;