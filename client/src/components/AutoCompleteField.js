import { useState, useEffect } from "react";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { AlgoliaProvider } from 'leaflet-geosearch';
import { EsriProvider } from 'leaflet-geosearch';
import UseDebounce from "../hooks/useDebounce";
import "./AutoCompleteField.css"
import Geocoder from 'leaflet-control-geocoder';

const AutoCompleteField = ({ handleChangeLocation }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [positionInput, setPositionInput] = useState("");

    const debouncedInput = UseDebounce(positionInput, 1000)

    useEffect(() => {
        getSuggestions()
    }, [debouncedInput])


    // const getSuggestions = async () => {
    //     const provider = new EsriProvider();
    //     let results = []
    //     if (debouncedInput) {
    //         results = await provider.search({ query: debouncedInput });
    //         console.log(results)
    //         if (results) {
    //             setFilteredSuggestions(results)
    //         }

    //     }
    // }

    const getSuggestions = async () => {
        const geocoder = Geocoder.nominatim();
        debouncedInput && geocoder.geocode(debouncedInput, results => {
            setFilteredSuggestions(results)

        })
    }

    const onChange = async (event) => {
        setPositionInput(event.target.value);
        setShowSuggestions(true);
        setActiveSuggestionIndex(0);

    };

    const onClick = (event, index) => {
        handleSubmitLocationForm(event, index)
        setFilteredSuggestions(filteredSuggestions[index]);
        setShowSuggestions(false);
        // setActiveSuggestionIndex(0);
    };


    const handleSubmitLocationForm = async (event, index) => {
        event.preventDefault();
        if (filteredSuggestions[index]) {
            const { city, town, village, locality, county, state, state_district, country } = filteredSuggestions[index].properties.address
            const address = [city, town, village, locality, county, state_district, state, country]
            const name = address.filter((element) => element !== undefined).filter((value, index, self) => { return self.indexOf(value) === index; }).join(", ")
            const { center } = filteredSuggestions[index]
            handleChangeLocation(name, center.lat, center.lng);
            setPositionInput("")
        }
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
            <div id="suggestions-container">
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        const { city, town, village, locality, county, state, state_district, country } = suggestion.properties.address
                        const address = [city, town, village, locality, county, state_district, state, country]
                        const name = address.filter((element) => element !== undefined).filter((value, index, self) => { return self.indexOf(value) === index; }).join(", ")
                        {/* let className;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        className = "suggestion-active";
                    } */}
                        return (
                            <li
                                key={index}
                                onClick={(event) => onClick(event, index)}
                                className="suggestion-elements"
                            // className={className}
                            >
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        ) : (
            <div className="no-suggestions">
                <span role="img" aria-label="tear emoji">
                    😪
                </span>{" "}
                <em>sorry no suggestions</em>
            </div>
        );
    };


    return (
        <div id="search-input">
            <form onSubmit={handleSubmitLocationForm}>
                <input
                    type="text"
                    onChange={onChange}
                    // onKeyDown={onKeyDown}
                    value={positionInput}
                    placeholder="Search by location"
                />
                {showSuggestions && positionInput && <SuggestionsListComponent />}
            </form>

        </div>
    );
};

export default AutoCompleteField;