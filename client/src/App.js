import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather.js"
import Map from "./components/Map.js"
import AutoCompleteField from "./components/AutoCompleteField.js";
import './App.css';


function App() {
  const [coordinatesForm, setCoordinatesForm] = useState(null);
  const [coordinatesMarker, setCoordinatesMarker] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    if (coordinatesForm) {
      setCoordinates(coordinatesForm)
    } if (coordinatesMarker) {
      setCoordinates(coordinatesMarker)
    }
  }, [coordinatesForm, coordinatesMarker])

  const handleChangeLocationForm = (label, lat, long) => {
    setCoordinatesMarker(null)
    setCoordinatesForm({ lat: lat, lng: long });
    setLocationName(label);
  }
  const handleChangeLocationMarker = (label, lat, long) => {
    setCoordinatesForm(null)
    setCoordinatesMarker({ lat: lat, lng: long });
    setLocationName(label);
  }

  return (
    <div>
      <AutoCompleteField handleChangeLocation={handleChangeLocationForm} />
      <CurrentWeather locationName={locationName} coordinates={coordinates} />
      <Map coordinates={coordinates} locationName={locationName} handleChangeLocation={handleChangeLocationMarker} />
    </div>
  );
}

export default App;
