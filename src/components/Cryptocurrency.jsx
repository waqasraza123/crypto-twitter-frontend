import React, {useContext, useState} from "react";
import axios from "axios";
import CryptoList from "./crypto/CryptoList";
import CryptoMeta from "./crypto/CryptoMeta";
import {AuthStateContext} from "../context/context";
import {useQuery} from "@tanstack/react-query";
import LoadingIcon from "./partials/LoadingIcon";
import CategoriesBar from "./CategoriesBar";

/**
 * Listings Class to list all the available crypto
 */
const Cryptocurrency = () => {

    const [showModal, setShowModal] = useState(false)
    const [cryptoMeta, setCryptoMeta] = useState({})
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
            console.log(response)
            return response?.data?.data
        }catch (error){
            console.log(error);
            return error
        }
    }

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["allCryptocurrencies"],
        queryFn: getAll
    })

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        return <p className="alert alert-danger">{error.message}</p>
    }

    return(
        <>
            <CategoriesBar />
            <CryptoMeta setShowModal = {setShowModal}
                        show = {showModal}
                        meta = {cryptoMeta} />
            <CryptoList listings={data} setShowModal={setShowModal} setCryptoMeta={setCryptoMeta} />
        </>
    );
}

export default Cryptocurrency;