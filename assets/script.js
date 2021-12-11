//calls every event inside the page to load before page is loaded

$(document).ready(function () {
    
    //weather condition variables:
    let currentWeather = $("#currentWeather");
    let currentCity = $("#currentCity");
    let currentTemp = $("#currentTemp");
    let currentWind = $("#currentWind");
    let currentHumidity = $("#currentHumidity");
    let currentUV = $("#currentUV");
    //search variables
    let searchHistory = $("#searchHistory");
    //get out of local storage...store in array that's in addition to stored cities or in the empty array
    let cityHistory = JSON.parse(localStorage.getItem("city") || []); //parse stored data to get out of string format
    
    
/*------------------ CLICK listener...grabs user entry and sends it to getWeather via 'city' variable ------------------*/        

//add city search button eventlistener       



let searchClickHandler = function(event) {
    event.preventDefault(); //prevent page from refreshing 

    let city = $("#cityInput").val(); //get the city name from input field     
    //for each city input loop through these functions
    getWeather(city); //send city to API to get weather 'data' 
    
    //send city to storage for later use 
    cityHistory.push(city);
    //getWeather sends 'data' from API to displayWeather
    //weather displays
    //remove current weather with the new click & replace it
    console.log(city);
    $("#city").val(""); //clear input field after it's displayed & stored
    
    displayHistory();
};


//store searched city into local storage --> localStorage.setItem (keyName, keyValue) per MDN
//keyName = cityHistory , keyValue = value in city History
localStorage.setItem(cityHistory, JSON.stringify(cityHistory));



/*------------------ FUNCTION to get DATA from OPEN WEATHER API ------------------*/
//"city" value comes from input field 
function getWeather (city) {
    // apiKey = "425535dc025827a7e77aa8a4d5289d87";
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=425535dc025827a7e77aa8a4d5289d87";
    
    fetch(apiUrl)
        //url fetched & returned in then() method
        //MDN uses arrow functions in their fetch API tutorial which is why I'm using them
        .then(response => {
            //if url successful:
            if (response.ok) {
                console.log(response);
                //put repsponse as json & put into "data"
                response.json().then((data) => {
                    console.log(data);
                    displayWeather(data); //call the function that display current weather
                });
            } else {
                //alert user that data was not fetched correctly by displayed status of the response
                alert("Error: " + response.statusText);
            }
        });
};

/*------------------ FUNCTION to take 'data' from getWeather put into useable variables to display ------------------*/
function displayWeather(data) {
    //first clear previous data (if any)
    //$(currentWeather).hide(); //make sure current weather is empty
    //city name
    let cityName = data.name; //takes "name" from the data object
    console.log(cityName);
    //$(currentWeather).append("<p>" + cityName + "<p>");
    $(currentCity).append("<p>" + cityName + "<p>"); //attach the city's name to currentyCity container

    console.log(data.weather); //this returns "0 {id..icon}"

    //weather icon 
    var weatherIcon = JSON.stringify(data.weather[0].icon);
    console.log(weatherIcon);
    let iconURL = new Image(); //adds image element 
    iconURL.src = "http://api.openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    $(currentCity).append(iconURL);
    
    //temperature
    let tempLevel = JSON.stringify(data.main.temp);
    $(currentTemp).append("<p>" + tempLevel + "<p>");

    //wind speed
    let windSpeed = JSON.stringify(data.wind.speed);
    $(currentWind).append("<p>" + windSpeed + "<p>"); //attach wind speed to container via a p element

    //humidity
    let humidityLevel = JSON.stringify(data.main.humidity);
   
    $(currentHumidity).append("<p>" + humidityLevel + "<p>");

};

        
    
    

    /*---------------displays cities searched in past-----------*/
    function displayHistory() {
        //empty the list first
        $(searchHistory).empty();
        //loop through storage until all stored cities are displayed (max of 6)
        for (let i=0; i < cityHistory.length; i++) {
            //searchHistory = id of div
            //display city as a list item that links to weather of that city if clicked on
            let listofCities = $(searchHistory).append("<a>" + cityHistory[i] + "</a>");
            console.log(listofCities);
             //append link into searchHistory container
            $("a").addClass("list-item");//make the link display as a list item
            //add an event listener if city in history is clicked 
            $(listofCities).on("click", function() {
                getWeather(cityHistory[i]);

            })
        }
    };
    

    let searchBtn = $("#searchBtn");
    searchBtn.addEventListener("click", searchClickHandler);
});
