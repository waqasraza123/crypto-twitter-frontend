import React, {useState} from "react";

const SearchBar = () => {

    const [searchText, setSearchText] = useState("")

    function searchTweets(e){
        e.preventDefault()
    }

    return(
        <div className="mt-3 mb-3">
            <form onSubmit={ (e) => searchTweets(e)}>
                <div className="mb-4">
                    <input type="text" value={searchText}
                        name="searchText"
                        className="form-control"
                        placeholder="Search for Tweets"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;