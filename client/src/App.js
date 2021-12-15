import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather.js"
import Map from "./components/Map.js"
import AutoCompleteField from "./components/AutoCompleteField.js";
import { MapContainer } from 'react-leaflet'
import './App.css';


function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const handleChangeLocation = (label, lat, long) => {
    setCoordinates({ lat: lat, lng: long });
    setLocationName(label);
  }
  const defaultFocusCoordinates = { lat: 0, lng: 0 };

  return (
    <div>

      <AutoCompleteField handleChangeLocation={handleChangeLocation} />
      <CurrentWeather locationName={locationName} coordinates={coordinates} />
      <Map coordinates={coordinates} handleChangeLocation={handleChangeLocation} />
    </div>
  );
}

export default App;
