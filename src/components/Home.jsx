import React from "react";
import Sidebar from "./tweets/Sidebar";
import Feed from "./tweets/Feed";
import Widgets from "./tweets/Widgets";

const Home = () => {

    return(
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <Sidebar />
                </div>
                <div className="col-6">
                    <Feed />
                </div>
                <div className="col">
                    <Widgets />
                </div>
            </div>
        </div>
    );
}

export default Home;