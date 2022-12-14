import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthStateContext} from "../../context/context";
import {toast} from "react-toastify";

const CommentForm = ({post, type, refetchComments}) => {

    const [comment, setComment] = useState("")
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/comments"

    //submit the form
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(url + path, {
                "commentable_id": post.id,
                "commentable_type": type,
                "comment": comment
            }, {
                headers: { "Authorization": "Bearer " + token }
            })
            toast.success(response.data.message)
            setComment("")
            console.log(response.data.comment)
            refetchComments()
        }catch (error){
            console.log(error)
        }
    }

    return(
        <div className="createCommentForm">
            <form className="post-form my-5" onSubmit={ (e) => handleSubmit(e)}>
                <div className="mb-3">
                    <textarea className="form-control" name="comment"
                        rows="5"
                        value={comment}
                        placeholder="Your comment here..."
                        onChange={ (e) => setComment(e.target.value) }
                    />
                </div>
                <button type="submit" className="btn btn-warning">Post Comment</button>
            </form>
        </div>
    )
}

export default CommentForm