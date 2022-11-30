import React, {useEffect, useState} from "react";
import axios from "axios";
import refreshAccessToken from "../config/refresh-token"
import CategoriesBar from "./CategoriesBar";

const CMCURL = "https://coinmarketcap.com/currencies/";

/**
 * Listings Class to list all the available crypto
 */
const Cryptocurrency = () => {

    const [listings, setListings] = useState([])

    //when the component is mounted to dom first
    useEffect(() => {

        //fetch the data via and update the listings state
        async function getAll() {

            const path = "/crypto/all";
            const url = process.env.REACT_APP_BASE_API_URL;

            //call the server for data
            try{
                const response = await axios.get(url + path)

                //update state
                setListings(response.data.data)

                //error - failed to fetch
            }catch (err){
                console.log(err.response.status);
            }
        }

        //call function and catch errors
        getAll().catch(error => console.log(error))

    }, [])

    //returns red or green class to indicate +ve or -ve change
    function percentageClasses(number){
        if(number < 0){
            return "text-danger";
        }

        return "text-success";
    }

    return(

        <>
            <h1 className="text-center my-4">Consuming Coinmarketcap API</h1>
            <table className="table table-hover">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">24h</th>
                    <th scope="col">7d</th>
                    <th scope="col">30d</th>
                    <th scope="col">Market Cap</th>
                    <th scope="col">Volume 24h</th>
                    <th scope="col">Last 7 Days</th>
                    <th scope="col"></th>
                </tr>
                </thead>

                <tbody>


                {
                    listings === null ?
                        <tr><td>Loading...</td></tr> :
                        listings.map(
                            (item) => {
                                let num = item.quote.USD;
                                return (
                                    <tr className="fs-6" key={item.id}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            <a className="text-decoration-none" href={CMCURL + item.slug}> {item.name} - <span className="text-muted fw-lighter">{item.symbol}</span></a>
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
                                        <td>View Charts</td>
                                        <td>View Markets</td>
                                    </tr>
                                )
                            }
                        )
                }

                </tbody>

            </table>
        </>
    );
}

export default Cryptocurrency;