"use strict";

let intervalId;
let latitude;
let longitude;
let city;
let retrievingPlaceholderMsg = "Retrieving... ";

let lavaLakeCoords = new Map();
lavaLakeCoords.set("Mount Erebus", [-77.53250, 167.14580]);
lavaLakeCoords.set("Nyiragongo", [-1.51920, 29.25420]);
lavaLakeCoords.set("Erta Ale", [13.60780, 40.65986]);
lavaLakeCoords.set("Masaya", [11.98270, -29.25420]);
lavaLakeCoords.set("Kilauea", [19.42102, 155.28678]);
lavaLakeCoords.set("Ambrym", [-16.24919, 168.12666]);

function getLatitude() {
    const latitudeInput = document.getElementById("latitude");
    let index = 0;

    intervalId = setInterval(() => {
        latitudeInput.placeholder = retrievingPlaceholderMsg.substring(0, index + 1);
        index = (index + 1) % retrievingPlaceholderMsg.length;
    }, 100);

    disableLongitude();
    disableLatitude();
    disableCity();
    // Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude;
                clearInterval(intervalId);
                latitudeInput.value = latitude;
                enableLongitude();  
                enableLatitude();
                enableCity();
            },
            (error) => {
                clearInterval(intervalId);
                latitudeInput.placeholder = "Error retrieving latitude.";
                enableLongitude();
                enableLatitude();
                enableCity();
            }
        );
    } else {
        clearInterval(intervalId);
        latitudeInput.placeholder = "Unable to fetch latitude.";
        enableLongitude();
        enableLatitude();
        enableCity();
    }
}

function getLongitude() {
    const longitudeInput = document.getElementById("longitude");
    let index = 0;

    intervalId = setInterval(() => {
        longitudeInput.placeholder = retrievingPlaceholderMsg.substring(0, index + 1);
        index = (index + 1) % retrievingPlaceholderMsg.length;
    }, 100);

    disableLatitude();
    disableLongitude();
    disableCity();

    // Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                longitude = position.coords.longitude;
                clearInterval(intervalId);
                longitudeInput.value = longitude;
                enableLatitude();
                enableLongitude();
                enableCity();
            },
            (error) => {
                clearInterval(intervalId);
                longitudeInput.placeholder = "Error retrieving longitude.";
                enableLatitude();
                enableLongitude();
                enableCity();
            }
        );
    } else {
        clearInterval(intervalId);
        longitudeInput.placeholder = "Unable to fetch longitude.";
        enableLatitude();
        enableLongitude();
        enableCity();
    }
}

function clearLatitude() {
    const latitudeInput = document.getElementById("latitude");
    latitudeInput.value = "";
    latitude = null;
    latitudeInput.placeholder = "Enter Latitude of Press Get";
}

function clearLongitude() {
    const longitudeInput = document.getElementById("longitude");
    longitudeInput.value = "";
    longitude = null;
    longitudeInput.placeholder = "Enter Longitude or Press Get";
}

function clearCity() {
    const cityInput = document.getElementById("myCity");
    cityInput.value = "";
    city = null;
    cityInput.placeholder = "Enter Your City or Town";
}

function disableLongitude() {
    document.getElementById("getLongitudeBtn").disabled = true;
    document.getElementById("clearLongBtn").disabled = true;
}

function enableLongitude() {
    document.getElementById("getLongitudeBtn").disabled = false;
    document.getElementById("clearLongBtn").disabled = false;
}

function disableLatitude() {
    document.getElementById("getLatitudeBtn").disabled = true;
    document.getElementById("clearLatBtn").disabled = true;
}

function enableLatitude() {
    document.getElementById("getLatitudeBtn").disabled = false;
    document.getElementById("clearLatBtn").disabled = false;
}

function disableCity() {
    document.getElementById("clearCityBtn").disabled = true;
}

function enableCity() {
    document.getElementById("clearCityBtn").disabled = false;
}

function calculateDistance() {
    // City
    const cityInput = document.getElementById("myCity");
    const city = cityInput.value;
    console.log(city);

    // City coordinates
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const latitude = latitudeInput.value;
    const longitude = longitudeInput.value;
    console.log("The coordinates of " + city + " are: " + latitude, longitude + '\n\n');
    
    // Lava Lake
    const lavaLake = document.getElementById("lavaLakes").value;
    console.log(lavaLake);

    // Lava Lake coordinates
    const latitudeLavaLake = lavaLakeCoords.get(lavaLake)[0];
    const longitudeLavaLake = lavaLakeCoords.get(lavaLake)[1];
    console.log("The coordinates of " + lavaLake + " are: " + latitudeLavaLake, longitudeLavaLake);

    // Distance calculation
    const distance = calculateDistanceBetweenCoordinates(latitude, longitude, latitudeLavaLake, longitudeLavaLake);
    const miles = distance * 0.621371;
    const roundedMiles = Math.round(miles);
    const roundedDistance = Math.round(distance);
    console.log("The distance between " + city + " and " + lavaLake + " is: " + roundedDistance + " km" + " or " + roundedMiles + " miles.");
    const distanceMessage = "The distance between " + city + " and " + lavaLake + " is: " + roundedDistance + " km" + " or " + roundedMiles + " miles.";
    const distanceOutput = document.getElementById("distanceCalculation");
    // print distanceMessage to distanceCalculation
    distanceOutput.innerHTML = distanceMessage;
}

function calculateDistanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
    lat1 = lat1 * Math.PI / 180;
    lon1 = lon1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    const d = 6371 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
    return d;
}