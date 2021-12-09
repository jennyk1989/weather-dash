//VARIABLES
//button variables
let searchBtn = $("#searchBtn");
//weather condition variables:
let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentWind = $("#currentWind");
let currentHumidity = $("#currentHumidity");
let currentUV = $("#currentUV");
//search variables
let searchHistory = $("#searchHistory");


//local storage
//localHistoryStorage =

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
    
}

//add city search button eventlistener
$("#searchBtn").on("click", function () {
    let city = $("#city").val(); //get the city name from input field
    getWeather(city);
    displayHistory();
    $("#city").val(""); //clear it after getWeather function

});



let displayHistory = function(city, searchHistory) {
    //check if city returned
    if (city.length === 0) {
        searchHistory.textContent = "No search history.";
        return;
    }
    
    //loop over history
    for (var i=0; i < city.length; i++) {
        //format city name
        var cityName = city[i].name + "/" + city[i].name;

        //creak link for each city
        var cityLink = document.createElement("a");
        cityLink.classList = "list-item flew-row justify-space-between align-center";
        cityLink.setAttribute("href", "./weather?q=" + cityName);

        //span element to hold city name
        var titleCity = document.createElement("span");
        titleCity.textContent = cityName;

        //append to container
        cityLink.appendChild(titleEl);

    }
}

