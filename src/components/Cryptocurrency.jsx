import {useState} from "react";
import CryptoList from "./crypto/CryptoList";
import CryptoMeta from "./crypto/CryptoMeta";
import LoadingIcon from "./partials/LoadingIcon";
import CategoriesBar from "./CategoriesBar";
import useCryptocurrencies from "../hooks/tweets/cryptocurrency/useCryptocurrencies";

/**
 * Listings Class to list all the available crypto
 */
const Cryptocurrency = () => {

    const [showModal, setShowModal] = useState(false)
    const [cryptoMeta, setCryptoMeta] = useState({})
    const {isLoading, isError, error, isSuccess, data, refetch} = useCryptocurrencies()

    //loading state
    if(isLoading){
        return <LoadingIcon />
    }

    //error while fetching data
    if(isError){
        console.log("is error")
        return <p className="alert alert-danger">{error.message}</p>
    }

    if(isSuccess){
        console.log(data)
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