import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthStateContext} from "../../context/context";
import {Link} from "react-router-dom";

const Subscription = () => {

    const [billingPortalUrl, setBillingPortalUrl] = useState("")
    const url = process.env.REACT_APP_BASE_API_URL
    const path = "/api/billing-portal"
    const token = useContext(AuthStateContext).token

    useEffect(() => {
        async function getStripeBillingPortalUrl(){
            try{
                const response = await axios.get(url + path, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                console.log(response)
            }catch (error){console.log(error)}
        }

        getStripeBillingPortalUrl().catch(error => console.log(error))
    }, [])

    return (
        <main className="mt-5">
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Payment via Stripe APIs</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$50<small
                                className="text-muted fw-light">/mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>10 users included</li>
                                <li>2 GB of storage</li>
                                <li>Email support</li>
                                <li>Help center access</li>
                            </ul>
                            <Link to="/payment-method" type="button" className="w-100 btn btn-lg btn-outline-primary">Monthly Payment
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">Stripe</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">$1500<small
                                className="text-muted fw-light">/mo</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>20 users included</li>
                                <li>10 GB of storage</li>
                                <li>Priority email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="w-100 btn btn-lg btn-primary">One Time Payment</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card mb-4 rounded-3 shadow-sm border-primary">
                        <div className="card-header py-3 text-bg-primary border-primary">
                            <h4 className="my-0 fw-normal">Generate Stripe Payment Invoice</h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">PDF<small
                                className="text-muted fw-light">/file</small></h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>30 users included</li>
                                <li>15 GB of storage</li>
                                <li>Phone and email support</li>
                                <li>Help center access</li>
                            </ul>
                            <button type="button" className="w-100 btn btn-lg btn-primary">Download PDF Invoice</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Subscription