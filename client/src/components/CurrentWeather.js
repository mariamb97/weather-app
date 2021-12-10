import React, { useState, useEffect } from 'react'
const API_KEY = "a81cd5ab66ea0cd54ae7b0cddeaec0da";

export default function CurrentWeather({ getMapCoordinates }) {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);
    const [weatherIconCode, setWeatherIconCode] = useState(null);
    const [weatherIconUrl, setWeatherIconUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getCoordinates()
    }, [weather])

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getWeather();
    };

    const getWeather = () => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        )
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                setWeather(data);
                setWeatherIconCode(data.weather[0].icon);
                setLoading(false);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    const getCoordinates = () => {
        if (weather) {
            const coordinates = weather.coord
            getMapCoordinates(coordinates)
        }
    }

    if (weatherIconCode) {
        fetch(`http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`).then(
            (data) => {
                setWeatherIconUrl(data.url);
            }
        );
    }
    let humanDateSunrise;
    if (weather) {
        const sunrise = weather.sys.sunrise;
        const milliseconds = sunrise * 1000;
        const dateSunrise = new Date(milliseconds);
        humanDateSunrise = dateSunrise.toString();
    }
    return (
        <div>
            <h1>Select your city</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={location} onChange={handleChange} />
                    <button>Get weather</button>
                    {/* <button onClick={handleSubmit}></button> better practice to use in the form */}
                </form>
            </div>
            <div>{loading ? <div>Data are loading ...</div> : <div></div>}</div>

            <div>
                {weather ? <div>Today's weather: {weather.weather[0].main}</div> : ""}
            </div>
            <div>
                {weather ? (
                    <div>More details: {weather.weather[0].description}</div>
                ) : (
                    ""
                )}
            </div>
            <div>
                <img src={weatherIconUrl} />
            </div>
            <div>
                {weather ? (
                    <div>
                        <div> Today's temperature: {weather.main.temp}</div>
                        <div>Perception: {weather.main.feels_like}</div>
                        <div>Max: {weather.main.temp_max}</div>
                        <div>Min: {weather.main.temp_min}</div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            {weather && <div>Sunrise hour: {humanDateSunrise}</div>}
            {/* <div>{weather && weather.message}</div> */}
            {error}
        </div>
    )
}
