import { useState, useEffect } from "react";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import UseDebounce from "../hooks/useDebounce";
import "./AutoCompleteField.css"

const AutoCompleteField = ({ handleChangeLocation }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [positionInput, setPositionInput] = useState("");

    const debouncedInput = UseDebounce(positionInput, 500)

    useEffect(() => {
        getSuggestions()
    }, [debouncedInput])


    const getSuggestions = async () => {
        const provider = new OpenStreetMapProvider();
        let results = []
        if (debouncedInput) {
            results = await provider.search({ query: debouncedInput });
            setFilteredSuggestions(results)
        }
    }

    const onChange = async (event) => {
        setPositionInput(event.target.value);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);

    };

    const onClick = (event) => {
        setFilteredSuggestions([]);
        setPositionInput(event.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    // const onKeyDown = (e) => {
    //     console.log(e.keyCode)
    //     if (e.keyCode === 13) {
    //         setPositionInput(filteredSuggestions[activeSuggestionIndex]);
    //         setActiveSuggestionIndex(0);
    //         setShowSuggestions(false);
    //     }
    //     // User pressed the up arrow
    //     else if (e.keyCode === 38) {
    //         if (activeSuggestionIndex === 0) {
    //             return;
    //         }

    //         setActiveSuggestionIndex(activeSuggestionIndex - 1);
    //     }
    //     // User pressed the down arrow
    //     else if (e.keyCode === 40) {
    //         if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
    //             return;
    //         }
    //         setActiveSuggestionIndex(activeSuggestionIndex + 1);
    //     }
    // };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                    {/* let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    } */}
                    return (
                        <li
                            key={index}
                            onClick={onClick}
                        // className={className}
                        >
                            {suggestion.label}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-suggestions">
                <span role="img" aria-label="tear emoji">
                    😪
                </span>{" "}
                <em>sorry no suggestions</em>
            </div>
        );
    };

    const handleSubmitLocationForm = async (event) => {
        const { x, y, label } = filteredSuggestions[0]
        event.preventDefault();
        handleChangeLocation(label, y, x);

    };

    return (
        <div>
            <h1>Select a position:</h1>
            <form onSubmit={handleSubmitLocationForm}>
                <input
                    type="text"
                    onChange={onChange}
                    // onKeyDown={onKeyDown}
                    value={positionInput}
                />
                {showSuggestions && positionInput && <SuggestionsListComponent />}
                <button>Get weather</button>
            </form>

        </div>
    );
};

export default AutoCompleteField;