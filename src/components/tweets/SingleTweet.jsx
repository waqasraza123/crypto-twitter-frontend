import {useParams} from "react-router-dom";
import CommentForm from "../comments/CommentForm";
import Comment from "../comments/Comment";
import UserInfo from "../partials/UserInfo";
import LoadingIcon from "../partials/LoadingIcon";
import useTweet from "../../hooks/tweets/useTweet";

const SingleTweet = () => {

    const {id} = useParams()
    const postType = "tweets"
    const {isLoading, isError, error, data, isSuccess, refetch} = useTweet(id)

    if(isLoading){
        return (
            <LoadingIcon />
        )
    }

    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    return (
        <div className="single-post-page">
            <UserInfo item={data} />
            <p className="col offset-2 fs-4 text-wrap text-break">{data.tweet}</p>
            <CommentForm post={data} type={postType} refetchComments={refetch} />
            <h1 className="text-center">Previous Comments</h1>

            {
                Object.keys(data?.comments).length > 0 ?
                    data?.comments.map(comment => {
                    return <Comment key={comment.id} comment={comment} />
                }) : <p className="text-center">Nothing to be found here.</p>
            }
        </div>
    )
}

export default SingleTweet