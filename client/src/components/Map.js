import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from "leaflet"
import Geocoder from 'leaflet-control-geocoder';
import './Map.css';



function MyComponent({ position, handleChangeLocation }) {
    const [data, setData] = useState(null)
    const map = useMap()
    const geocoder = Geocoder.nominatim();
    // let data = null
    let marker = null

    useEffect(() => {
        reverseGeocode()
    }, [position])

    const reverseGeocode = async () => {
        position && await geocoder.reverse(position, map.options.crs.scale(map.getZoom()), results => {
            setData(results[0]);
            console.log(position)
            handleChangeLocation(results[0].name, position.lat, position.lng)
            // if (results[0]) {
            //     if (marker) {
            //         marker
            //             .setLatLng(data.center)
            //             .setPopupContent(data.html || data.name)
            //             .open.Popup();
            //     } else {
            //         marker = L.marker(data.center)
            //             .bindPopup(data.name)
            //             .addTo(map)
            //             .openPopup();
            //     }
            // }
        })
    }

    return null
}

export default function Map({ coordinates, handleChangeLocation }) {
    const [position, setPosition] = useState(null)
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])


    const defaultFocusCoordinates = { lat: 0, lng: 0 };

    return (
        <div>
            <MapContainer center={defaultFocusCoordinates} zoom={2} scrollWheelZoom={false}>
                <MyComponent position={position} handleChangeLocation={handleChangeLocation} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates &&
                    <Marker
                        draggable={draggable}
                        eventHandlers={eventHandlers}
                        position={coordinates}
                        ref={markerRef}
                    >
                        <Popup minWidth={90}>
                            <span onClick={toggleDraggable}>
                                {draggable
                                    ? 'Marker is draggable'
                                    : 'Click here to make marker draggable'}
                            </span>
                        </Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    )
};


