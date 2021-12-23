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

    let windDegrees

    let contentOddClassNameGrndLevel
    let characteristicOddClassNameGrndLevel
    let characteristicBoxOddClassNameGrndLevel
    let characteristicNameOddClassNameGrndLevel

    let contentOddClassNameWindGust
    let characteristicOddClassNameWindGust
    let characteristicBoxOddClassNameWindGust
    let characteristicNameOddClassNameWindGust

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

        windDegrees = `rotate(${weather.wind.deg + 134}deg)`

        weather.main.grnd_level ? contentOddClassNameGrndLevel = "current-weather-characteristics-content" : contentOddClassNameGrndLevel = "current-weather-characteristics-content odd-container"
        weather.main.grnd_level ? characteristicOddClassNameGrndLevel = "current-weather-characteristic" : characteristicOddClassNameGrndLevel = "current-weather-characteristic odd-container"
        weather.main.grnd_level ? characteristicNameOddClassNameGrndLevel = "characteristic-name" : characteristicNameOddClassNameGrndLevel = "characteristic-name odd-content-name"
        weather.main.grnd_level ? characteristicBoxOddClassNameGrndLevel = "characteristic-box" : characteristicBoxOddClassNameGrndLevel = "characteristic-box odd-content"

        weather.wind.gust ? contentOddClassNameWindGust = "current-weather-characteristics-content" : contentOddClassNameWindGust = "current-weather-characteristics-content odd-container"
        weather.wind.gust ? characteristicOddClassNameWindGust = "current-weather-characteristic " : characteristicOddClassNameWindGust = "current-weather-characteristic odd-container"
        weather.wind.gust ? characteristicNameOddClassNameWindGust = "characteristic-name" : characteristicNameOddClassNameWindGust = "characteristic-name odd-content-name"
        weather.wind.gust ? characteristicBoxOddClassNameWindGust = "characteristic-box " : characteristicBoxOddClassNameWindGust = "characteristic-box odd-content"

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
                                    <div className="characteristic-box">
                                        <i class="fas fa-tint characteristic-icon"></i>
                                        <span className="characteristic-name"> Humidity </span>
                                        <span className="characteristic-value">{weather.main.humidity + " "}%</span>
                                    </div>
                                </div>
                                <div className="current-weather-characteristic">
                                    <div className="characteristic-box">
                                        <i class="fas fa-eye characteristic-icon"></i>
                                        <span className="characteristic-name">Visibility</span>
                                        <span className="characteristic-value"> {(weather.visibility / 1000).toFixed(2) + " "} km</span>
                                    </div>
                                </div>
                                <div className="current-weather-characteristic">
                                    <div className="characteristic-box">
                                        <i class="fas fa-long-arrow-alt-up characteristic-icon"></i>
                                        <span className="characteristic-name"> Sunrise</span>
                                        <span className="characteristic-value"> {humanSunriseTime + " (h)"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="current-weather-characteristics-content">
                                <div className="current-weather-characteristic">
                                    <div className="characteristic-box">
                                        <i class="fas fa-cloud characteristic-icon"></i>
                                        <span className="characteristic-name">Cloudiness</span>
                                        <span className="characteristic-value">{weather.clouds.all + " "}%</span>
                                    </div>
                                </div>
                                <div className="current-weather-characteristic">
                                    <div className="characteristic-box">
                                        <i class="far fa-sun characteristic-icon"></i>
                                        <span className="characteristic-name">Daylight </span>
                                        <span className="characteristic-value"> {humanDayLight + " (h)"}</span>
                                    </div>
                                </div>
                                <div className="current-weather-characteristic">
                                    <div className="characteristic-box">
                                        <i class="fas fa-long-arrow-alt-down characteristic-icon"></i>
                                        <span className="characteristic-name"> Sunset </span>
                                        <span className="characteristic-value"> {humanSunsetTime + " (h)"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-current-weather-container" >
                        <div id="current-weather-details">
                            <h4 className="characteristic-title">Wind</h4>
                            <div id="wind-direction">
                                <span id="wind-direction-title" >Direction</span>
                                {windDegrees && <i class="fas fa-location-arrow characteristic-icon" style={{ transform: windDegrees }} ></i>}

                            </div>
                        </div>
                        <div>
                            <div className="current-weather-characteristics-container">
                                <div className={contentOddClassNameWindGust}>
                                    <div className={characteristicOddClassNameWindGust}>
                                        <div className={characteristicBoxOddClassNameWindGust}>
                                            <i class="fas fa-wind characteristic-icon"></i>
                                            <span className={characteristicNameOddClassNameWindGust}>Speed</span>
                                            <span className="characteristic-value">{" " + Math.round(weather.wind.speed * 3.6) + " "}(km/h)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="current-weather-characteristics-content">
                                    {weather.wind.gust && <div className="current-weather-characteristic">
                                        <div className="characteristic-box wind-gust">
                                            <div className="characteristic-double-icon">
                                                <i class="fas fa-wind"></i>
                                                <i class="fas fa-wind"></i>
                                            </div>
                                            <span className="characteristic-name">Wind gust</span>
                                            <span className="characteristic-value">{" " + Math.round(weather.wind.gust * 3.6) + " "}(km/h)</span>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-current-weather-container">
                        <div id="current-weather-details">
                            {/* <i class="fas fa-compress-arrows-alt"></i> */}
                            <h4 className="characteristic-title">Atmospheric pressure</h4>
                        </div>
                        <div className="current-weather-characteristics-container">
                            <div className={contentOddClassNameGrndLevel}>
                                <div className={characteristicOddClassNameGrndLevel}>
                                    <div className={characteristicBoxOddClassNameGrndLevel}>
                                        <i class="fas fa-water characteristic-icon"></i>
                                        <span className={characteristicNameOddClassNameGrndLevel}>Sea level</span>
                                        <span className="characteristic-value"> {weather.main.sea_level ? (weather.main.sea_level) : weather.main.pressure}{" "}(mb)</span>
                                    </div>
                                </div>
                            </div>
                            {weather.main.grnd_level &&
                                <div className="current-weather-characteristics-content">
                                    <div className="current-weather-characteristic">
                                        <div className="characteristic-box">
                                            <i class="fas fa-align-justify characteristic-icon"></i>
                                            <span className="characteristic-name">Ground level</span>
                                            <span className="characteristic-value"> {weather.main.grnd_level + " "}(mb)</span>
                                        </div>
                                    </div>
                                </div>}

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
        </div >
    )
}
