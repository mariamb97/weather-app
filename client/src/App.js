import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather.js"
import Map from "./components/Map.js"
import './App.css';


function App() {
  const [coordinates, setCoordinates] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const onChangeLocation = (label, lat, long) => {
    setCoordinates({ lat: lat, lng: long });
    setLocationName(label);
  }

  return (
    <div>
      <CurrentWeather locationName={locationName} coordinates={coordinates} />
      <Map handleChangeLocation={onChangeLocation} />
    </div>
  );
}

export default App;
