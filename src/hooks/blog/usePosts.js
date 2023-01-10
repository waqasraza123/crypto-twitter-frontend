import React from "react";
import axios from "axios";
import {useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {AuthStateContext} from "../../context/context";

const usePosts = (pageParam = 1) => {

    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token
    const path = "/api/blog/posts"

    async function getPosts(pageParam){
        try{
            const response = await axios.get(url + path + "?page=" + pageParam, {
                headers: {"Authorization": "Bearer " + token}
            })
            console.log(response?.data)
            return response?.data
        }catch (error){
            console.log(error)
            return error
        }
    }

    const {isLoading, isError, isSuccess, error, data, status, refetch} = useQuery({
        queryKey: ["blogPosts", pageParam],
        queryFn: () => getPosts(pageParam)
    })

    return {isLoading, isError, isSuccess, error, data, status, refetch}

}

export default usePosts