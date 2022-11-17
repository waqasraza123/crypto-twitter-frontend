import React, {Component} from "react";
import axios from "axios";

const baseURL = "https://coinmarketcap.com/currencies/";

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
    getAllCryptoListings() {
        let response = null;

        axios.get('http://localhost:8000/api/v1/cryptocurrency/listings/latest')
            .then( (res) => {
                    response = res;
                    console.log(response.data.data);
                })
            .catch( (error) => console.log(error) )
            .finally(
                () => {
                    this.setState({listings: response.data.data})
                } )
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
                                            <a className="text-decoration-none" href={baseURL + item.slug}> {item.name} - <span className="text-muted fw-lighter">{item.symbol}</span></a>
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