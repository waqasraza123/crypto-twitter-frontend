import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {AuthStateContext} from "../../context/context";

const useTweet = (tweetId) => {

    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/tweet/" + tweetId;

    async function getTweet(){
        try{
            const response = await axios.get(url + path, {
                headers:{"Authorization": "Bearer " + token}
            })
            return response?.data?.tweet
        }catch (error){
            return error;
        }
    }

    const {isLoading, isError, error, data, isSuccess, refetch} = useQuery({
        queryKey: ["tweet", tweetId],
        queryFn: () => getTweet(tweetId)
    })

    return {isLoading, isError, error, data, isSuccess, refetch}
}

export default useTweet