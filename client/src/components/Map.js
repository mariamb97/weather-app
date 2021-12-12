import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import './Map.css';



export default function Map({ coordinates, handleChangeLocation }) {
    const [position, setPosition] = useState({})
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

    useEffect(() => {
        getSuggestions()
    }, [position])

    const defaultFocusCoordinates = { lat: 0, lng: 0 };


    const getSuggestions = async () => {
        const provider = new OpenStreetMapProvider();
        let results = []
        if (position) {
            results = await provider.search({ query: position });
            console.log(results)
        }
    }

    return (
        <div>
            <MapContainer center={defaultFocusCoordinates} zoom={2} scrollWheelZoom={false}>
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


