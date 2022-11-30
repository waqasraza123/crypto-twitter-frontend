import React from "react";

const CategoriesBar = () => {
    return(
        <div className="container mx-auto mt-5 mb-5 text-center">
            <div className="row">
                <div className="col">
                    <button className="btn btn-success">Latest</button>
                    <button className="btn btn-success mx-1">Trending</button>
                    <button className="btn btn-success">Gainers & Losers</button>
                </div>
            </div>
        </div>
    )
}

export default CategoriesBar;