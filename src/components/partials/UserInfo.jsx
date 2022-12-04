import React from "react";
import moment from "moment";

const UserInfo = ({item}) => {

    return(
        <>
            <p className="text-center">{item.author.name}</p>
            <p className="text-center">Posted {moment(item.createdAt).fromNow()}</p>
            <button className="btn btn-sm btn-success">follow</button>
        </>
    )

}

export default UserInfo;