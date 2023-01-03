import React from "react";
import moment from "moment";

const UserInfo = ({item}) => {

    return(
        <>
            <p className="text-center">{item.user.name}</p>
            <p className="text-center">Posted {moment(item.created_at).fromNow()}</p>
            <button className="btn btn-sm btn-success">follow</button>
        </>
    )

}

export default UserInfo;