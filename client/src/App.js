import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather.js"
import Map from "./components/Map.js"
import './App.css';


function App() {
  const [coordinates, setCoordinates] = useState({ lat: 51.505, lng: -0.09 });

  const getMapCoordinates = (coordinates) => {
    setCoordinates(coordinates)
  }

  return (
    <div>
      <CurrentWeather getMapCoordinates={getMapCoordinates} />
      <Map coordinates={coordinates} />
    </div>
  );
}

export default App;
