import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.js"
import CurrentWeather from "./components/CurrentWeather.js"
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
      <NavBar handleChangeLocation={handleChangeLocationForm} />
      <div id="current-weather-container">
        <CurrentWeather locationName={locationName} coordinates={coordinates} handleChangeLocation={handleChangeLocationMarker} />

      </div>
    </div>
  );
}

export default App;
