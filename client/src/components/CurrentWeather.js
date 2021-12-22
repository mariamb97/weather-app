import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Map from "./Map.js"
import "./CurrentWeather.css"
const API_KEY = "a81cd5ab66ea0cd54ae7b0cddeaec0da";


export default function CurrentWeather({ locationName, coordinates, handleChangeLocation }) {
    const [weather, setWeather] = useState(null);
    const [weatherDescription, setWeatherDescription] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        coordinates && getWeather()
    }, [coordinates])
    useEffect(() => {
        toUpperCaseWeatherDescription()
    }, [weather])

    const getWeather = () => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                setWeather(data);
                setLoading(false);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    let humanSunriseTime;
    let humanSunsetTime
    let humanDayLight

    let humanCalculationWeekDay
    let humanCalculationDay
    let humanCalculationMonth
    let humanCalculationYear
    let humanCalculationTime

    if (weather) {
        const { sys, dt, timezone } = weather

        const dateSunriseArray = new Date((sys.sunrise + timezone - 3600) * 1000).toString().split(" ");
        const dateSunsetArray = new Date((sys.sunset + timezone - 3600) * 1000).toString().split(" ");
        const dateDayLightArray = new Date((sys.sunset - sys.sunrise) * 1000).toString().split(" ");;
        const dateCalculationTimeArray = new Date((dt + timezone - 3600) * 1000).toString().split(" ");
        console.log(dateDayLightArray)

        const sunriseTime = dateSunriseArray[4]
        const sunsetTime = dateSunsetArray[4]
        // const dayLightTime = dateDayLightArray[4]
        const calculationTime = dateCalculationTimeArray[4]


        humanSunriseTime = sunriseTime.substring(0, 5)
        humanSunsetTime = sunsetTime.substring(0, 5)
        humanDayLight = dateDayLightArray[4].substring(0, 5)
        humanCalculationTime = calculationTime.substring(0, 5)
        humanCalculationWeekDay = dateCalculationTimeArray[0]
        humanCalculationDay = dateCalculationTimeArray[2]
        humanCalculationMonth = dateCalculationTimeArray[1]
        humanCalculationYear = dateCalculationTimeArray[3]
    }


    const toUpperCaseWeatherDescription = () => {
        if (weather) {
            let description = weather.weather[0].description
            description = description.charAt(0).toUpperCase() + description.slice(1)
            setWeatherDescription(description)
        }
    }

    return (
        <div className="weather-container">
            {loading && <div>Data are loading ...</div>}
            {weather &&
                <div>
                    <div className="main-current-weather-container">
                        <div className="main-current-weather-content">
                            <div id="weather-main-temperature"> {Math.round(weather.main.temp)} °C</div>
                            <div id="weather-main-position">
                                <h2>{`${locationName}`}</h2>
                                {weather.dt && <div id="calculation-date">As of {`${humanCalculationWeekDay} ${humanCalculationDay} ${humanCalculationMonth} ${humanCalculationYear} ${humanCalculationTime}`}</div>}
                            </div>
                            <div id="weather-main-description">
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" id="weather-icon" />
                                <div id="weather-icon-description"> {weatherDescription}</div>
                            </div>
                        </div>
                    </div>
                    <Map coordinates={coordinates} locationName={locationName} handleChangeLocation={handleChangeLocation} />
                    <div className="main-current-weather-container">
                        <div>
                            <div id="current-weather-details">
                                <h4 id="current-weather-title">Current weather</h4>
                                <div id="current-weather-feels-like">
                                    <div id="current-weather-feels-like-temperature"> {weather.main.feels_like} °C</div>
                                    <div>Feels Like</div>
                                </div>
                            </div>
                            <div className="current-weather-characteristics-container">
                                <div className="current-weather-characteristics-content">
                                    <div className="current-weather-characteristic">
                                        <i class="fas fa-tint"></i>
                                        <span> Humidity </span>
                                        <span>{weather.main.humidity + " "}%</span>
                                    </div>
                                    <div className="current-weather-characteristic">
                                        <i class="fas fa-cloud"></i>
                                        <span>Cloudiness</span>
                                        <span>{weather.clouds.all + " "}%</span>
                                    </div>
                                    <div className="current-weather-characteristic">
                                        <i class="fas fa-eye"></i>
                                        <span>Visibility</span>
                                        <span> {(weather.visibility / 1000).toFixed(2) + " "} km</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="current-weather-characteristics-container">
                            <div className="current-weather-characteristics-content">
                                <div className="current-weather-characteristic">
                                    <i class="fas fa-wind"></i>
                                    <span>Wind speed</span>
                                    <span>{" " + Math.round(weather.wind.speed * 3.6) + " "}(km/h)</span>
                                </div>
                                {weather.wind.gust && <div className="current-weather-characteristic">
                                    <i class="fas fa-wind"></i>
                                    <i class="fas fa-wind"></i>
                                    <span> Wind gust</span>
                                    <span>{" " + Math.round(weather.wind.gust * 3.6) + " "}(km/h)</span>
                                </div>}
                                <div className="current-weather-characteristic">Wind direction: {weather.wind.deg + " "}°</div>
                            </div>
                        </div>

                        <div className="current-weather-characteristics-container">
                            <div className="current-weather-characteristics-content">
                                <div className="current-weather-characteristic">
                                    <i class="far fa-sun"></i>
                                    <span>Daylight {humanDayLight + " (h)"}</span>
                                </div>
                                <div className="current-weather-characteristic">
                                    <i class="fas fa-long-arrow-alt-up"></i>
                                    <span> Sunrise {humanSunriseTime + " (h)"}</span>
                                </div>
                                <div className="current-weather-characteristic">
                                    <i class="fas fa-long-arrow-alt-down"></i>
                                    <span> Sunset {humanSunsetTime + " (h)"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="current-weather-characteristics-container">
                            <div className="current-weather-characteristics-content">
                                <div className="current-weather-characteristic">
                                    <i class="fas fa-compress-alt"></i>
                                    <span>Atmospheric pressure</span>
                                </div>
                                <div className="current-weather-characteristic"> on the sea level:
                                    <span> {weather.main.sea_level ? (weather.main.sea_level) : weather.main.pressure}{" "}(mb)</span>
                                </div>
                                {weather.main.grnd_level &&
                                    <div className="current-weather-characteristic">on the ground level:
                                        <span> {weather.main.grnd_level + " "}(mb)</span>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </div>}
            <div>
                {weather && weather.rain && weather.rain["1h"] && <div>Rain volume for the last 1 hour: {weather.rain["1h"] + " "}mm</div>}
                {weather && weather.rain && weather.rain["3h"] && <div>Rain volume for the last 3 hours: {weather.rain["3h"] + " "}mm</div>}
            </div>
            <div>
                {weather && weather.snow && weather.snow["1h"] && <div>Snow volume for the last 1 hour: {weather.snow["1h"] + " "}mm</div>}
                {weather && weather.snow && weather.snow["3h"] && <div>Snow volume for the last 3 hours: {weather.snow["3h"] + " "}mm</div>}
            </div>


            {error}
            <Outlet />
        </div>
    )
}
