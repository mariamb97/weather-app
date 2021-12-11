import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MapSearchField from "./MapSearchField";
import './Map.css';



export default function Map({ handleChangeLocation }) {
    // const [draggable, setDraggable] = useState(false)
    // const markerRef = useRef(null)
    // const eventHandlers = useMemo(
    //     () => ({
    //         dragend() {
    //             const marker = markerRef.current
    //             if (marker != null) {
    //                 setPosition(marker.getLatLng())
    //             }
    //         },
    //     }),
    //     [],
    // )
    // const toggleDraggable = useCallback(() => {
    //     setDraggable((d) => !d)
    // }, [])

    // useEffect(() => {
    // setPosition(coordinates)
    // }, [coordinates])

    const DefaultFocusCoordinates = { lat: 0, lng: 0 };
    return (
        <div>
            <MapContainer center={DefaultFocusCoordinates} zoom={2} scrollWheelZoom={false}>
                <MapSearchField handleChangeLocation={handleChangeLocation} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'Marker is draggable'
                                : 'Click here to make marker draggable'}
                        </span>
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    )
};


