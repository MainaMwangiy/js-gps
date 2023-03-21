import { useState } from 'react';

function App() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
//Check if geolocation is enabled
  if (navigator.permissions) {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      if (result.state === 'granted') {
        /* GPS is enabled */
        console.log('GPS is enabled');
      } else {
        /* GPS is disabled */
        console.log('GPS is disabled');
      }
    });
  } else {
    /* permissions API is not available */
    console.log('Permissions API is not available');
  }
  
  // Check if the Geolocation API is supported by the browser
  if ('geolocation' in navigator) {
    // Try to get the current position of the device
    navigator.geolocation.getCurrentPosition(
      // onSuccess callback function
      function (position) {
        // Log the latitude and longitude to the console
        // console.log('Latitude: ' + position.coords.latitude);
        // console.log('Longitude: ' + position.coords.longitude);
        setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      // onError callback function
      function (error) {
        console.log('Error getting GPS location: ' + error.message);
      },
      // Geolocation options
      { enableHighAccuracy: true }
    );
  } else {
    console.log('Geolocation API not supported by the browser');
  }

  return (
    <div className="App">
      {`Latitude: ${position.latitude} Longitude: ${position.longitude}`}
    </div>
  );
}

export default App;
