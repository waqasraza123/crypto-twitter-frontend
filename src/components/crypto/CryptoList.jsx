import React from "react";
import axios from "axios";

const CryptoList = ({listings, percentageClasses, setModalShow, setCurrentItem}) => {

    const apiBaseURL = process.env.REACT_APP_BASE_API_URL
    const path = "/crypto/meta"

    /**
     * handle click on the table/list item
     * @param show
     * @param cryptoName
     */
    function handleClick(show, cryptoName){

        //set current currency for modal
        setCurrentItem(cryptoName)

        //show modal
        setModalShow(show)

        //get meta deta for the selected currency
        getMeta(cryptoName).then(error  => console.log(error))
    }


    /**
     * fetches the data from server
     * @param slug
     * @returns {Promise<void>}
     */
    async function getMeta(slug){
        console.log("getMeta called")
        try {
            const response = await axios.get( apiBaseURL + path, {
                params:{
                    slug: slug
                }
            })

            if(response){
                const currency = response.data.data[1]
                console.log(currency.description)
            }

        }catch (error){
            console.log(error)
        }
    }

    return(
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
                                    <a className="text-decoration-none" onClick={() => handleClick(true, item.slug)} href="#"> {item.name} - <span className="text-muted fw-lighter">{item.symbol}</span></a>
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
    )
}

export default CryptoList;