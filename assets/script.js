//VARIABLES
//button variables
let searchBtn = $("#searchBtn");
//weather condition variables:
let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentWind = $("#currentWind");
let currentHumidity = $("#currentHumidity");
let currentUV = $("#currentUV");

// Open Weather API
const APIKey = "425535dc025827a7e77aa8a4d5289d87";

// API parameter = "city"
let currentWeather = function(city) {

    //format the Open Weather API URL
    let apiUrl = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

    //fetch the weather from the OpenWeather URl
    fetch(apiUrl)
        //data fetched & returned in then() method
        .then(function(response) {
            //successful:
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    displayWeather(data, city);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        });
}

//search for a city, then presented with current & future condition



//search for a city & it's added to search history

//when viewing city's current weather conditions, see name, date, icon representing conditions, temp, humidity, wind speed, uv index

//when view uv index --> presented with a color that indicates favorable, moderate, or severe conditions

//when viewing city's future weather conditions, see a 5 day forecast
//5day forecast displays date, icon of weather conditions, temp, wind speed, humidity

//click on city in search history & then current & future conditions for that city are displayed

//OPEN WEATHER API INFO
/*how to use API KEYS
1. request api key
2. create variable to store API key (var APIKey = "......")
3. create variables for the api call
4. construct a query url to make the api call
5. make the call using Fetch
6. use the reponse data in your website 




*/
// API CALL = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
/* 
API Calls
-by city name --> api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
my api key 425535dc025827a7e77aa8a4d5289d87

API responses:
city.name

current.temp 
current.humidity
current.uvi 
current.wind_speed

API ICONS:
clear sky = 01d.png
few clouds = 02d.png
scattered clouds = 03d.png
broken clouds = 04d.png
shower rain = 09d.png
rain = 10d.png
thunderstorm = 11d.png
snow = 13d.png
mist = 50d.png

*/
