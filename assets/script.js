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

//"city" value comes from input field 
function getWeather (city) {
    // apiKey = "425535dc025827a7e77aa8a4d5289d87";
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=425535dc025827a7e77aa8a4d5289d87";
    
    fetch(apiUrl)
        //url fetched & returned in then() method
        .then(response => {
            //if url successful:
            if (response.ok) {
                console.log(response);
                //take the JSON formated response & put it into "data"
                response.json().then((data) => {
                    console.log(data);
                    
                    //city name
                    let cityName = data.name; //takes "name" from the data object
                    console.log(cityName);
                    $(currentCity).append("<p>" + cityName + "<p>"); //attach the city's name to currentyCity container

                    //weather icon 
                    let weatherIcon = data.weather.icon;

                    //temperature
                    let tempLevel = JSON.stringify(data.main.temp);
                    $(currentTemp).append("<p>" + tempLevel + "<p>");

                    //wind speed
                    let windSpeed = JSON.stringify(data.wind.speed);
                    $(currentWind).append("<p>" + windSpeed + "<p>"); //attach wind speed to container via a p element

                    //humidity
                    let humidityLevel = JSON.stringify(data.main.humidity);
                    $(currentHumidity).append("<p>" + humidityLevel + "<p>");

                    //uv index
                    

















                });
            } else {
                alert("Error: " + response.statusText); //alerts user of "Error: " + status message from response interface
            }
        });
        
};

    
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



