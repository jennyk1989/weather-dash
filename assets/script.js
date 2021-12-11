//calls every event inside the page to load before page is loaded

//weather condition variables:
let currentWeather = $("#currentWeather");
//search variables
let searchBtn = $("#searchBtn");
let listofCities = $("#listofCities");
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
    $(currentWeather).empty(); 
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
    
    /*
    //weather icon 
    var weatherIcon = JSON.stringify(data.weather[0].icon);
    console.log(weatherIcon);
    let iconURL = new Image(); //adds image element 
    iconURL.src = "http://api.openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    $(currentWeather).append(iconURL);
    */

};

        
    
    

    /*---------------displays cities searched in past-----------*/
    function displayHistory(cityHistory) {
        console.log(cityHistory);
        cityHistoryCard.html = "";
        $("#cityHistoryCard").empty();

        //i = 1 to get rid of "null" value that keeps showing up 
        for (let i=1; i < cityHistory.length; i++) {
            let cityHistoryItem = $("<a>");
            cityHistoryItem.addClass("list-group-item");//make the link display as a list item
            //add city name to the link
            cityHistoryItem.text(cityHistory[i]);
            cityHistoryItem.attr("href");
            $("#cityHistoryCard").append(cityHistoryItem);
            
        }
            
        console.log(cityHistory);
    };
    
/*------------------ CLICK listener...grabs user entry and sends it to getWeather via 'city' variable ------------------*/

$(searchBtn).on("click", function(event) {  
    event.preventDefault(); //prevent page from refreshing 

    let city = $("#cityInput").val(); //get the city name from input field
    
    //if city input is empty, do nothing
    if (city === "") {
        return;
    }

    getWeather(city); //send city to API to get weather 'data' 
    
    //send city to storage for later use 
    cityHistory.push(city);

    //want to be able to store each city into this the cityHistory array

    console.log(city);
    $("#city").val(""); //clear input field after it's displayed & stored
    
    //store searched city into local storage --> localStorage.setItem (keyName, keyValue) per MDN
    //keyName = cityHistory , keyValue = value in city History
    localStorage.setItem(cityHistory, JSON.stringify(cityHistory));
    displayHistory(cityHistory);

});

//click listener for any clicks on the cityHistory list 
$("#cityHistoryCard").on("click", ".list-group-item", function () { 
    //bring back up clicked city's weather conditions
    //define variable to hold city's name
    var searchedCity = $(this).text(); //export city's name as text
    getWeather(searchedCity);
});

