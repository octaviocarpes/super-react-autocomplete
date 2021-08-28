import React, { useState, useMemo, useCallback } from "react"
import "./styles.css"
import { debounce } from "../../utils/debounce";
import { fetchPeople } from "../../api";

export const FunctionalAutoComplete = () => {
    const [search, setSearch] = useState("")
    const [value, setValue] = useState("")
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async (name) => {
        try {
            if (name.length === 0) {
                setResults([]);
                return;
            }

            setIsLoading(true);

            const response = await fetchPeople(name);
            const data = await response.json();
            setIsLoading(false);
            handleResponse(data)
        } catch (error) {
            setError(true);
            setIsLoading(false);
            console.log(error);
        }
    }, [])

    const handleResponse = (data) => {
        if (data.results.length > 0) {
            setResults([...data.results.map(result => ({ name: result.name, created: result.created }))])
            setError(false)
        } else {
            setError(true)
        }
    }

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
    }

    const renderResults = () => (
        <ul className={"results"}>
            {results.map((result, index) => (
                <li
                    onClick={() => handleSelect(result.name)}
                    className={"item"}
                    key={result.created}
                    tabIndex={index}
                >
                    {getHighlightedText(result.name, search)}
                </li>
            ))}
        </ul>
    )

    const debounceSearch = useMemo(() => {
        return debounce((search) => fetchData(search), 300);
    }, [fetchData]);

    const handleInput = (value) => {
        setValue(value)
        setSearch(value)
        debounceSearch(value)
    }

    const handleSelect = (value) => {
        setSearch(value)
        setResults([])
    }

    return (
        <div className={"auto-complete"}>
            {search ? <label>You have selected: {search}</label> : <label>Search for a Star Wars Character (Luke, Leia...)</label>}
            <div className={"input"}>
                <input value={search || value} onInput={(event) => handleInput(event.target.value)} />
                { isLoading ? <img src={"https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=82a1493bhuerux895q9qmo3xnxg0gjd1t8ar7vxzg212meha&rid=200w.gif&ct=g"} alt={''} /> : null}
            </div>
            { results.length > 0 ? renderResults() : null }
            { error ? <span className={"error"}><i>No characters found</i> :/</span> : null }
        </div>
    )
}
