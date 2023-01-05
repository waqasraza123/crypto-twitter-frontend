import React, {useContext, useState} from "react";
import axios from "axios";
import CryptoList from "./crypto/CryptoList";
import CryptoMeta from "./crypto/CryptoMeta";
import {AuthStateContext} from "../context/context";
import {useQuery} from "react-query";
import LoadingIcon from "./partials/LoadingIcon";

/**
 * Listings Class to list all the available crypto
 */
const Cryptocurrency = () => {

    const [listings, setListings] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [currentitem, setCurrentItem] = useState({})
    const [meta, setMeta] = useState({})
    const token = useContext(AuthStateContext).token

    async function getAll() {

        const path = "/api/crypto/all";
        const url = process.env.REACT_APP_BASE_API_URL;

        //call the server for data
        try{
            const response = await axios.get(url + path, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            //update state
            setListings(response.data.data)

            //error - failed to fetch
        }catch (err){
            console.log(err);
        }
    }

    /**
     * returns red or green class to
     * indicate +ve or -ve change
     * @param number
     * @returns {string}
     */
    function percentageClasses(number){
        if(number < 0){
            return "text-danger";
        }
        return "text-success";
    }

    const {isLoading, isError, error, data} = useQuery({
        queryKey: ["cryptocurrencies"],
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
            <h1 className="text-center my-4">Consuming Coinmarketcap API</h1>
            <CryptoMeta show={modalShow}
                        currentitem={currentitem}
                        meta={meta}
                        onHide={() => setModalShow(false)} />

            <CryptoList listings={listings}
                        percentageClasses={percentageClasses}
                        setCurrentItem={setCurrentItem}
                        setMeta={setMeta}
                        setModalShow={setModalShow} />
        </>
    );
}

export default Cryptocurrency;