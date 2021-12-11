import React, { useState, useEffect } from 'react'
const API_KEY = "a81cd5ab66ea0cd54ae7b0cddeaec0da";

export default function CurrentWeather({ locationName, coordinates }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        coordinates && getWeather()
    }, [coordinates])

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

    // let humanDateSunrise;
    // if (weather) {
    //     const sunrise = weather.sys.sunrise;
    //     const milliseconds = sunrise * 1000;
    //     const dateSunrise = new Date(milliseconds);
    //     humanDateSunrise = dateSunrise.toString();
    // }

    return (
        <div>
            <h2>{locationName}</h2>
            {loading && <div>Data are loading ...</div>}

            {weather &&
                <div>
                    <div>Today's weather: {weather.weather[0].main}</div>
                    <div>More details: {weather.weather[0].description}</div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <div>
                        <div> Today's temperature: {weather.main.temp} °C</div>
                        <div>Perception: {weather.main.feels_like} °C</div>
                        <div>Max: {weather.main.temp_max} °C</div>
                        <div>Min: {weather.main.temp_min} °C</div>
                    </div>
                    {/* {weather && <div>Sunrise hour: {humanDateSunrise}</div>} */}
                    {/* <div>{weather && weather.message}</div> */}
                </div>}
            {error}
        </div>
    )
}
