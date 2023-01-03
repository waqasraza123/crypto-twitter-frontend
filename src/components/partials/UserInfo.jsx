import React from "react";
import moment from "moment";
import UserImage from "./UserImage";

const UserInfo = ({item}) => {

    return(
        <div>
            <div className="row">
                <div className="col-2 profile-image">
                    <UserImage photo={item.user.photo} width="50px" height="50px" />
                </div>
                <div className="col-10">
                    <a href="#">{item.user.name}</a>
                    <span className="mx-1 text-secondary">@{item.user.username}</span>
                    <button className="btn btn-sm btn-success">follow</button>
                    <p>{moment(item.created_at).fromNow()}</p>
                </div>
            </div>
        </div>
    )

}

export default UserInfo;