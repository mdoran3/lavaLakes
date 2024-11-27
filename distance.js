"use strict";

function getLocation() {
    const latitudeField = document.getElementById("latitude");
    const longitudeField = document.getElementById("longitude");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update the input fields with the current location
            latitudeField.value = latitude;
            longitudeField.value = longitude;
        }, (error) => {
            alert("Unable to retrieve your location. Please allow location access.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}