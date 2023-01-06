import React from "react";
import SingleCrypto from "./SingleCrypto";
import LoadingIcon from "../partials/LoadingIcon";

const CryptoList = ({listings, setShowModal, setCryptoMeta}) => {

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
                listings === undefined ? <LoadingIcon /> :
                listings.map(item => {
                        return <SingleCrypto item={item} key={item.id}
                                 setCryptoMeta={setCryptoMeta}
                                 setShowModal={setShowModal} />
                    }
                )
            }
            </tbody>
        </table>
    )
}

export default CryptoList;