import React, {Component} from "react";
import axios from "axios";

const CMCURL = "https://coinmarketcap.com/currencies/";

/**
 * Listings Class to list all the available crypto
 */
export default class Listings extends Component {

    state = {
        listings: null
    }

    //when the component is mounted to dom first
    componentDidMount() {
        this.getAllCryptoListings();
    }

    //returns red or green class to indicate +ve or -ve change
    percentageClasses(number){
        if(number < 0){
            return "text-danger";
        }

        return "text-success";
    }

    //fetch the data via and update the listings state
    async getAllCryptoListings() {

        const path = "/crypto/all";
        const baseUrl = process.env.REACT_APP_BASE_API_URL;
        const accessToken = localStorage.getItem("accessToken");

        try{
            const response = await axios.get(baseUrl + path, {
                headers: {"Authorization": "Bearer " + accessToken}
            });

            if(response){
                this.setState({listings: response.data.data});
            }

        }catch (err){
            console.log(err.message);
        }

    }


        /**
     * Render function
     * @returns {JSX.Element}
     */
    render() {
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
                        this.state.listings === null ?
                            <tr><td>Loading...</td></tr> :
                            this.state.listings.map(
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
                                        <td className={this.percentageClasses(num.percent_change_24h)}>
                                            {num.percent_change_24h.toFixed(2)}%
                                        </td>
                                        <td className={this.percentageClasses(num.percent_change_7d)}>
                                            {num.percent_change_7d.toFixed(2)}%
                                        </td>
                                        <td className={this.percentageClasses(num.percent_change_30d)}>
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
        );
    }
}