import {useContext} from "react";
import {AuthStateContext} from "../../../context/context";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const useCryptocurrencies = () => {
    const token = useContext(AuthStateContext).token
    const path = "/api/crypto/all";
    const url = process.env.REACT_APP_BASE_API_URL;

    async function getAll() {

        //call the server for data
        try{
            const response = await axios.get(url + path, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            return response?.data?.data
        }catch (error){
            console.log(error)
            return error
        }
    }

    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
        queryKey: ["cryptocurrencies"],
        queryFn: getAll
    })

    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useCryptocurrencies