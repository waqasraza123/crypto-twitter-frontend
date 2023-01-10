import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useContext} from "react";
import {AuthStateContext} from "../../context/context";

const useTweets = (pageParam = 1) => {

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/tweets"
    const token = useContext(AuthStateContext).token

    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery({
        queryKey: ["tweets", pageParam],
        queryFn: () => getTweets(pageParam)
    })

    async function getTweets(pageParam){
        try{
            const response = await axios.get(url + path + "?page=" + pageParam, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
            //update state
            const tweets = response?.data?.tweets
            return tweets

        }catch (error){
            return error
        }
    }

    return {isLoading, isError, error, isSuccess, data, refetch}
}

export default useTweets