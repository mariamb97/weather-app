import React from 'react'
import { Link } from "react-router-dom";
import AutoCompleteField from "./AutoCompleteField.js";
import "./NavBar.css"

export default function NavBar({ handleChangeLocation }) {
    return (
        <div id="nav-bar">
            <span id="icon">
                <i className="fas fa-meteor"></i>
                <span id="meteo-map">Meteo Map</span>
            </span>
            <AutoCompleteField handleChangeLocation={handleChangeLocation} />

            {/* <ul>
                <li><Link to="/current-weather/map">Current Weather</Link></li>
            </ul> */}
        </div>
    )
}
