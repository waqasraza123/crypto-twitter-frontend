import React from "react"
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useContext} from "react";
import {AuthStateContext} from "../../context/context";

const usePost = (postId) => {

    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/blog/post/"
    const token = useContext(AuthStateContext).token

    async function getPost(postId){
        try{
            const response = await axios.get(url + path + postId, {
                headers: { "Authorization": "Bearer " + token }
            })
            const post = response?.data?.post
            return post
        }catch (error){ return error }
    }

    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery({
        queryKey: ["singlePost", postId],
        queryFn: () => getPost(postId),
    })

    return {isLoading, isError, error, isSuccess, data, refetch}
}

export default usePost