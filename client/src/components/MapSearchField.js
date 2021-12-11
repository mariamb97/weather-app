import React, { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet'
import 'leaflet-geosearch/dist/geosearch.css';

const SearchField = ({ handleChangeLocation }) => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
        provider: provider,
        style: 'button',
    });

    const map = useMap();

    const onChangeLocation = (event) => {
        console.log(event);
        const { location: { x, y, label } = {} } = event;
        //  x => lon,
        //  y => lat,
        handleChangeLocation(label, y, x);
    }

    useEffect(() => {
        map.addControl(searchControl);
        map.on('geosearch/showlocation', onChangeLocation);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

export default SearchField;