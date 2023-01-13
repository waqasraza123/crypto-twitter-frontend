import React, {useContext} from "react";
import axios from "axios";
import {AuthStateContext} from "../../context/context";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const SingleCrypto = ({item, setCryptoMeta, setShowModal}) => {

    const token = useContext(AuthStateContext).token
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/crypto/meta/"
    const num = item?.quote?.USD;
    const currencyId = item.id
    const navigate = useNavigate()

    const {isLoading, isError, error, isSuccess, data, refetch} = useQuery({
        queryKey: ["cryptoMeta", currencyId],
        queryFn: () => getMeta(currencyId),
        refetchOnWindowFocus: false,
        enabled: false
    })

    //return classes
    function percentageClasses(number){
        return number < 0 ? "text-danger" : "text-success";
    }

    async function getMeta(id){
        //get crypto meta
        try{
            const response = await axios.get(url + path + id, {
                headers:{"Authorization": "Bearer " + token}
            })
            console.log(response)
            const meta = response?.data?.data[id]
            setCryptoMeta(meta)
            return meta
        }catch (error){console.log(error); return error}
    }

    //handle item click
    function handleClick(){

        //empty the old meta info
        setCryptoMeta({})

        //fetch the meta now
        refetch()

        //show modal
        setShowModal(true)
    }

    function makeTweet(){
        navigate("/feed", {
            state: {
                crypto: item
            }
        })
    }

    //render function
    return (
        <>
            <tr className="fs-6" key={item.id}>
                <td>{item.id}</td>
                <td>
                    <a className="text-decoration-none"
                       onClick={() => handleClick(true)}
                       href="#"> {item.name} - <span className="text-muted fw-lighter">{item.symbol}</span>
                    </a>
                </td>
                <td>
                    ${num.price.toLocaleString()}
                </td>
                <td className={percentageClasses(num.percent_change_24h)}>
                    {num.percent_change_24h.toFixed(2)}%
                </td>
                <td className={percentageClasses(num.percent_change_7d)}>
                    {num.percent_change_7d.toFixed(2)}%
                </td>
                <td className={percentageClasses(num.percent_change_30d)}>
                    {num.percent_change_30d.toFixed(2)}%
                </td>
                <td>
                    ${num.market_cap.toLocaleString()}
                </td>
                <td>
                    ${num.volume_24h.toLocaleString()}
                </td>
                <td>
                    <button onClick={makeTweet} className="btn btn-primary btn-sm">Tweet this?</button>
                </td>
            </tr>
        </>
    )
}

export default SingleCrypto