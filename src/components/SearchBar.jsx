import React, {useState, useEffect, useCallback, useContext, useRef} from "react";
import axios from "axios";
import {AuthStateContext} from "../context/context";
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
    const url = process.env.REACT_APP_BASE_API_URL
    const token = useContext(AuthStateContext).token

    const [search, setSearch] = useState("")
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [debouncedSearch] = useDebounce(search, 500)
    const inputRef = useRef(null)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get(url + `/api/global-search/${debouncedSearch}`,{
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                setResults(response.data)
            } catch (err) {
                setError(err)
            }
            setIsLoading(false)
        }
        if(debouncedSearch) {
            fetchData()
        }
        else {
            setResults(null)
        }
    }, [debouncedSearch])

    const handleBlur = () => {
        setTimeout(() => {
            if (!inputRef.current.contains(document.activeElement)) {
                setResults(null);
            }
        }, 0);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="input-group mb-3">
                        <input
                            ref={inputRef}
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onBlur={handleBlur}
                        />
                    </div>
                    {isLoading && <div>Loading...</div>}
                    {error && <div>Error!</div>}
                    {results && (
                        <div className="list-group">
                            {results.tweets.map((tweet) => (
                                <a href="#" className="list-group-item list-group-item-action" key={tweet.id}>
                                    {tweet.tweet}
                                </a>
                            ))}
                            {results.blog_posts.map((post) => (
                                <a href="#" className="list-group-item list-group-item-action" key={post.id}>
                                    {post.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchBar;