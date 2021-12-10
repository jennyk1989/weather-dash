//VARIABLES
//button variables
let searchBtn = $("#searchBtn");
//weather condition variables:
let currentWeather = $("#currentWeather");
let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentWind = $("#currentWind");
let currentHumidity = $("#currentHumidity");
let currentUV = $("#currentUV");
//search variables
let searchHistory = $("#searchHistory");

//local storage
let cityArray = [];

// Open Weather API

// API parameter = "city"
function getWeather (city) {
    let apiKey = "425535dc025827a7e77aa8a4d5289d87";
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=425535dc025827a7e77aa8a4d5289d87";
    
    fetch(apiUrl)
        //url fetched & returned in then() method
        .then(function(response) {
            //if url successful:
            if (response.ok) {
                console.log(response);
                //json() method formats response as JSON, then captures the Promise into "data"
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert("Error: " + response.statusText); //alerts user of "Error: " + status message from response interface
            }
        });
        
    };


function weatherInfo (city) {
    fetch(apiUrl)
        
}
    let cityName = $('<p>').text("City: " + response.name);
    $("#currentcity").append("<h3>" + cityName + "</h3>");
//add city search button eventlistener
$("#searchBtn").on("click", function () {
    let city = $("#city").val(); //get the city name from input field
    console.log(city);
    //push the city searched into the cityArray
    cityArray.push(city);
    console.log(city);
    //store searched city into local storage
    localStorage.setItem("city", JSON.stringify(cityArray));
    //run these funcitons
    getWeather(city);
    displayHistory();
    $("#city").val(""); //clear it after it's displayed & stored

});

//card id=currentWeather 
/* currentCity: .name
currentTemp: main.temp
currentWind: wind.speed
currentUV: ?
icon: 
*/


function displayHistory() {
    //pull cityArray out of localstorage
    let storedCities = JSON.parse(localStorage.getItem("city"));
    console.log(storedCities);
    //loop through storage until all stored cities are displayed (max of 6)
    for (let i=0; i < storedCities.length; i++) {
        
        //display city as a list item that links to weather of that city if clicked on
        $("#searchHistory").append("<a>" + storedCities[i] + "</a>");
        $("a").addClass("list-item flex-row justify-space-between align-center");
        $("a").attr("apiUrl");

    }
};



