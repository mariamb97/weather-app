import React, { useState } from 'react';
import UseDebounce from "../hooks/useDebounce";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AutoCompleteField from "./AutoCompleteField";

export default function SearchField() {
    // const [positionInput, setPositionInput] = useState("");
    // const [suggestions, setSuggestions] = useState([])

    // const provider = new OpenStreetMapProvider();

    // const debouncedPositionInput = UseDebounce(positionInput, 600)

    // const handleChange = (event) => {
    //     setPositionInput(event.target.value);
    // };

    const handleSubmitPositionInput = async (event) => {
        // event.preventDefault();
        // const results = await provider.search({ query: positionInput });
        // console.log(results)
        // setSuggestions(results)
    };
    return (
        <div>
            <h1>Select a position:</h1>
            <div className="form">
                <form onSubmit={handleSubmitPositionInput}>
                    {/* <input type="text" value={positionInput} onChange={handleChange} /> */}
                    <AutoCompleteField />
                    <button>Get weather</button>
                </form>
            </div>
        </div>
    )
}
