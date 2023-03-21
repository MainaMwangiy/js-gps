import React, { useState, useEffect } from "react";
import { Geolocation } from '@capacitor/geolocation';

function Location() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGeolocation = async () => {
            try {
                const position = await Geolocation.getCurrentPosition();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            } catch (error) {
                setError(error.message);
            }
        };
        getGeolocation();
    }, []);

    return (
        <div>
            <h1>Geolocation</h1>
            {latitude && <p>Latitude: {latitude}</p>}
            {longitude && <p>Longitude: {longitude}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default Location;
