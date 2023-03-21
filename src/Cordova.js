import React, { useState, useEffect } from 'react';

function App() {
  const [gpsData, setGpsData] = useState(null);

  useEffect(() => {
    // Check if location services are enabled
    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
      console.log("GPS is "+(enabled ? "enabled" : "disabled"));
      if(!enabled){
        // Prompt the user to enable location services
        cordova.plugins.diagnostic.switchToLocationSettings();
      }
    },function(error){
      console.error("An error occurred: "+ error);
    });

    // Get the GPS data
    cordova.plugins.locationAccuracy.request(function (success) {
      console.log("Successfully requested GPS accuracy: " + success.message);
      cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
        if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
          cordova.plugins.diagnostic.getCurrentPosition(function (position) {
            console.log("Got GPS position: " + JSON.stringify(position));
            setGpsData(position);
          }, function (error) {
            console.error("An error occurred while getting GPS position: " + error);
          }, {
            enableHighAccuracy: true,
            timeout: 5000
          });
        } else {
          console.warn("Location permission not granted");
        }
      }, function (error) {
        console.error("An error occurred while getting location authorization status: " + error);
      });
    }, function (error) {
      console.error("An error occurred while requesting GPS accuracy: " + error);
    }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

  }, []);

  return (
    <div>
      {gpsData && (
        <div>
          <p>Latitude: {gpsData.coords.latitude}</p>
          <p>Longitude: {gpsData.coords.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default App;
