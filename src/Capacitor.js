export default{
    getGeoLocation: async function (dispatch) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((coordinate) => {
                let latitude = coordinate.coords.latitude;
                let longitude = coordinate.coords.longitude;
                Geocode.fromLatLng(latitude, longitude).then(
                    (response) => {
                        const address_component = response.results[0].formatted_address;
                        let currentAddressData = {
                            currentAddress: address_component,
                            mapCoordinates: {
                                lat: latitude,
                                lng: longitude
                            }
                        };
                        dispatch({ type: actions.SET_GEO_LOCATION_DATA, geoLocationData: currentAddressData });
                        // Store the coordinates locally
                        localStorage.setItem('latitude', latitude);
                        localStorage.setItem('longitude', longitude);
                    },
                    (error) => {
                        console.info(error);
                    }
                );
            });
        } else if (Geolocation) {
            await Geolocation.requestPermissions();
            const position = await Geolocation.getCurrentPosition();
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            Geocode.fromLatLng(latitude, longitude).then(
                (response) => {
                    const address_component = response.results[0].formatted_address;
                    let currentAddressData = {
                        currentAddress: address_component,
                        mapCoordinates: {
                            lat: latitude,
                            lng: longitude
                        }
                    };
                    dispatch({ type: actions.SET_GEO_LOCATION_DATA, geoLocationData: currentAddressData });
                    // Store the coordinates locally
                    localStorage.setItem('latitude', latitude);
                    localStorage.setItem('longitude', longitude);
                },
                (error) => {
                    console.info(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            return;
        }
    },
}