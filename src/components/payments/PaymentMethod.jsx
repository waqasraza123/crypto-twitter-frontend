import React, {useContext} from "react";
import {AuthStateContext} from "../../context/context";

const PaymentMethod = () => {

    const intent = useContext(AuthStateContext).user?.intent

    return(
        <div>
            <input id="card-holder-name" type="text" />

            <div id="card-element"></div>

            <button id="card-button" data-secret={ intent }>
                Update Payment Method
            </button>
        </div>
    )
}

export default PaymentMethod