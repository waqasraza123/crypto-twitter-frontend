import React, {useContext} from "react";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {AuthStateContext} from "../../context/context";

const useProfile = () => {

    const path = "/api/user-profile"
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token

    const getUserProfile = async () => {
        try{
            const response = await axios.get(url + path, {
                headers: {"Authorization": "Bearer " + token}
            })
            return response?.data?.user
        }catch (error){ return error }
    }

    const {isLoading, isError, error, isSuccess, data} = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile
    })

    return {isLoading, isError, error, isSuccess, data}
}

export default useProfile