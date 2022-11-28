//Searh Button
const searchButton = document.querySelector(".search button");

//Weather Info Div
const weatherInfo = document.querySelector(".temp");

//City Search
const citySearch = document.querySelector('.search-bar');

//Humidity
const humidityDisplay = document.querySelector(".humidity")

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Display Temperature in DIV
function weatherReport(_displayTemp, _humidity, _windSpeed, _weatherCode) {
    document.querySelector(".temp").innerText = `${_displayTemp}°f`
    document.querySelector(".humidity").innerText = `Humidity: ${_humidity}%`
    document.querySelector(".wind").innerText = `Wind Speed: ${_windSpeed} MPH`
    if (_weatherCode == 0) {
        document.querySelector(".description").innerText = "Clear sky";
    } else if (_weatherCode > 0 && _weatherCode <= 3) {
        document.querySelector(".description").innerText = "Partly cloudy";
    } else if (_weatherCode >= 45 && _weatherCode <= 48) {
        document.querySelector(".description").innerText = "Fog";
    } else if (_weatherCode >= 51 &&_weatherCode <= 55) {
        document.querySelector(".description").innerText = "Drizzle";
    } else if (_weatherCode >= 56 &&_weatherCode <= 57) {
        document.querySelector(".description").innerText = "Freezing Drizzle";
    } else if (_weatherCode >= 61 &&_weatherCode <= 65) {
        document.querySelector(".description").innerText = "Rain";
    } else if (_weatherCode >= 66 &&_weatherCode <= 67) {
        document.querySelector(".description").innerText = "Freezing rain";
    } else if (_weatherCode >= 71 &&_weatherCode <= 75) {
        document.querySelector(".description").innerText = "Snow";
    } else if (_weatherCode == 77) {
        document.querySelector(".description").innerText = "Snow grains";
    } else if (_weatherCode >= 80 &&_weatherCode <= 82) {
        document.querySelector(".description").innerText = "Rain showers";
    } else if (_weatherCode >= 85 &&_weatherCode <= 86) {
        document.querySelector(".description").innerText = "Snow showers";
    } else if (_weatherCode == 95) {
        document.querySelector(".description").innerText = "Thunderstorm";
    } else if (_weatherCode >= 96 &&_weatherCode <= 99) {
        document.querySelector(".description").innerText = "Thunderstorm with hail";
    } 
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//weatherReport => searchWeather => Button


//Button for searching City
searchButton.addEventListener("click", () => {
    const city = citySearch.value;
    const latitude = ''
    const longitude = ''
    weatherInfo.innerHTML = '';
    humidityDisplay.innerText = '';
    $.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`, function(data){
       
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        searchWeather(latitude, longitude);
        //current city being searched
        document.querySelector(".city").innerText = `Weather in ${citySearch.value}`
    });
});

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Function to search temperature,humidity, wind speed, and weathercode based on lat, long from city
 function searchWeather(lat, long){         
    $.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,cloudcover,windspeed_10m&daily=weathercode&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles`, function(tempData){
        console.log(tempData);
        const temperature = Math.floor(tempData.hourly.temperature_2m[0]);
        const humidity = tempData.hourly.relativehumidity_2m[0];
        const windSpeed = tempData.hourly.windspeed_10m[0];
        const weatherCode = tempData.daily.weathercode[0];
        console.log("windspeed", windSpeed)
        console.log("humidity", humidity);
        console.log("temperature", temperature);
        console.log("weatherCode", weatherCode);
         weatherReport(temperature, humidity, windSpeed, weatherCode);      
    });
 }

//default start displaying weather in Tacoma
function startScreen() {
    searchWeather(47.2529, -122.4443);
}
startScreen();

 //https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&models=best_match&temperature_unit=fahrenheit