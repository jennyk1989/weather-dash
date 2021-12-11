//calls every event inside the page to load before page is loaded

//weather condition variables:
let currentWeather = $("#currentWeather");
//search variables
let searchBtn = $("#searchBtn");
let searchHistory = $("#searchHistory");
//get out of local storage...store in array that's in addition to stored cities or in the empty array
let cityHistory = JSON.parse(localStorage.getItem("city") || []); //parse stored data to get out of string format
    


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
    //variables to handles the city-specific data coming from the API
    let cityName = data.name; //takes "name" from the data object
    let tempLevel = JSON.stringify(data.main.temp);
    let windSpeed = JSON.stringify(data.wind.speed);
    let humidityLevel = JSON.stringify(data.main.humidity);

    //take these variables and append them to the currentWeather card as <p> elements
    $(currentWeather).append("<p>" + cityName + "</p>");
    $(currentWeather).append("<p>" + tempLevel + "</p>");
    $(currentWeather).append("<p>" + windSpeed + "</p>");
    $(currentWeather).append("<p>" + humidityLevel + "</p>");
    
    
    //weather icon 
    var weatherIcon = JSON.stringify(data.weather[0].icon);
    console.log(weatherIcon);
    let iconURL = new Image(); //adds image element 
    iconURL.src = "http://api.openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    $(currentWeather).append(iconURL);
    

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
    
/*------------------ CLICK listener...grabs user entry and sends it to getWeather via 'city' variable ------------------*/

$(searchBtn).on("click", function(event) {  
    event.preventDefault(); //prevent page from refreshing 

    let city = $("#cityInput").val(); //get the city name from input field     
    getWeather(city); //send city to API to get weather 'data' 
    
    //send city to storage for later use 
    cityHistory.push(city);

    //want to be able to store each city into this the cityHistory array

    console.log(city);
    $("#city").val(""); //clear input field after it's displayed & stored
    
    //store searched city into local storage --> localStorage.setItem (keyName, keyValue) per MDN
    //keyName = cityHistory , keyValue = value in city History
    localStorage.setItem(cityHistory, JSON.stringify(cityHistory));
    displayHistory();

});

//click listener for any clicks on the cityHistory list (listofCities)
$(document).on("click", listofCities, function () { 
    //bring back up clicked city's weather conditions

});

