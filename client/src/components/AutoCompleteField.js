import { useState, useEffect } from "react";
// import { OpenStreetMapProvider } from 'leaflet-geosearch';
// import { AlgoliaProvider } from 'leaflet-geosearch';
// import { EsriProvider } from 'leaflet-geosearch';
import UseDebounce from "../hooks/useDebounce";
import Geocoder from 'leaflet-control-geocoder'
import "./AutoCompleteField.css"
    ;

const AutoCompleteField = ({ handleChangeLocation }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState(null);
    const [filteredUniqueSuggestions, setFilteredUniqueSuggestions] = useState(null)
    // const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [positionInput, setPositionInput] = useState("");
    // const [suggestionsNames, setSuggestionsNames] = useState([])
    // const [uniqueSuggestionsNames, setUniqueSuggestionsNames] = useState([])


    const debouncedInput = UseDebounce(positionInput, 1000)

    useEffect(async () => {
        getSuggestions()
    }, [debouncedInput])
    useEffect(() => {
        filteredSuggestions && getFilteredSuggestions()
    }, [filteredSuggestions])


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
        await debouncedInput && geocoder.geocode(debouncedInput, results => {
            setFilteredSuggestions(results)
        })
        getFilteredSuggestions()

    }

    const getFilteredSuggestions = async () => {
        let filteredByNameSuggestions
        if (filteredSuggestions && filteredSuggestions.length) {
            setFilteredUniqueSuggestions(filteredSuggestions)
            filteredByNameSuggestions = await filteredSuggestions.filter((suggestion, index, filteredSuggestions) => {
                for (const property in suggestion) {
                    const uniqueIndex = filteredSuggestions.findIndex((element) => element["name"] === suggestion["name"])
                    if (index === uniqueIndex) {
                        return index === uniqueIndex
                    } else {
                        return false
                    }
                }
            })
        }
        setFilteredUniqueSuggestions(filteredByNameSuggestions)
    }

    const onChange = async (event) => {
        setPositionInput(event.target.value);
        setShowSuggestions(true);
        // setActiveSuggestionIndex(0);

    };

    const onClick = (event, index) => {
        handleSubmitLocationForm(event, index)
        setFilteredSuggestions(filteredSuggestions[index]);
        setShowSuggestions(false);
        // setActiveSuggestionIndex(0);
    };


    const handleSubmitLocationForm = async (event, index) => {
        event.preventDefault();
        if (filteredUniqueSuggestions[index]) {
            const { center, name } = filteredUniqueSuggestions[index]
            const suggestionName = name.split(",").filter((value, index, self) => {
                const splitValueArray = value.split("-")
                return self.indexOf(value) === index && !Number(value) && !Number(splitValueArray[0])
            }).join(",")
            handleChangeLocation(suggestionName, center.lat, center.lng);
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
        return filteredUniqueSuggestions ? (
            <div id="suggestions-container">
                <ul className="suggestions">
                    {filteredUniqueSuggestions.map((suggestion, index) => {
                        const { name } = suggestion
                        const suggestionName = name.split(",").filter((value, index, self) => {
                            const splitValueArray = value.split("-")
                            return self.indexOf(value) === index && !Number(value) && !Number(splitValueArray[0])
                        }).join(",")
                        // let className;
                        // Flag the active suggestion with a class
                        // if(index === activeSuggestionIndex) {
                        //   className = "suggestion-active" }
                        return (
                            <li
                                key={index}
                                onClick={(event) => onClick(event, index)}
                                className="suggestion-elements"
                            // className={className}
                            >
                                {suggestionName}
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