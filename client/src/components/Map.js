import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import Geocoder from 'leaflet-control-geocoder';
import './Map.css';


function MyMarker({ coordinates, locationName, handleChangeLocation }) {
    const [onClickCoordinates, setOnClickCoordinates] = useState(null)
    const map = useMap()
    const geocoder = Geocoder.nominatim();

    useEffect(() => {
        onClickCoordinates && reverseGeocode()
    }, [onClickCoordinates])

    map.on('click', event => {
        setOnClickCoordinates(event.latlng)
    })

    const reverseGeocode = async () => {
        await geocoder.reverse(onClickCoordinates, map.options.crs.scale(map.getZoom()), results => {
            console.log(results)
            results[0] && handleChangeLocation(results[0].name, onClickCoordinates.lat, onClickCoordinates.lng)
        })
    }

    return (
        <div>
            {coordinates &&
                <Marker position={coordinates}>
                    <Popup minWidth={90}>
                        <span>
                            {locationName}
                        </span>
                    </Popup>
                </Marker>
            }
        </div>
    )
}

export default function Map({ coordinates, handleChangeLocation, locationName }) {
    const defaultFocusCoordinates = { lat: 0, lng: 0 };

    return (
        <div>
            <MapContainer center={defaultFocusCoordinates} zoom={2} scrollWheelZoom={false}>
                <MyMarker coordinates={coordinates} locationName={locationName} handleChangeLocation={handleChangeLocation} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    )
};


