//calls every event inside the page to load before page is loaded

//weather condition variables:
let currentWeather = $("#current-weather");
let cityDateIcon = $("city-date-icon");
let cityNameColumn = $("#cityNameColumn")
let weatherIcon = $("#weatherIcon")
let dateDiv = $("#dateDiv")
let weatherValues = $("#weather-values");
let uvDiv = $("#uv-div");
let fiveDay = $("#five-day");
let fiveDayTitle = $("#five-day-title");
let fiveDayCards = $("#five-day-cards");
//search variables
let searchBtn = $("#search-button");
//get out of local storage...store in array that's in addition to stored cities or in the empty array
let cityHistory = JSON.parse(localStorage.getItem("city")) || []; //parse stored data to get out of string format
    


/*------------------ FUNCTION to get DATA from OPEN WEATHER API ------------------*/
//"city" value comes from input field 
function getWeather (city) {
    // apiKey = "425535dc025827a7e77aa8a4d5289d87";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=425535dc025827a7e77aa8a4d5289d87";
    console.log(apiUrl);
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
                    getForecast(data);
                });
            } else {
                //alert user that data was not fetched correctly by displayed status of the response
                alert("Error: " + response.statusText);
            }
        });
};
/*------------------ FUNCTION to take 'data' from getWeather put into useable variables to display ------------------*/
function displayWeather(data) {
    //==========city icon date ==================
    $(cityDateIcon).empty();
    //city
    let cityName = data.name; //takes "name" from the data object
    $(cityDateIcon).append("<p>" + cityName + "</p>").attr("class", "col-6");
    
    //date
    let currentDate = moment().format("dddd, MMM, Do, YYYY")
    $(cityDateIcon).append("<p>" + currentDate + "</p>").attr("class", "col-4");

    //icon
    let iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    $(cityDateIcon).append($("<img>").attr("src", iconURL).attr("class", "btn"));

    

    //=============weather values card ================/
    $(weatherValues).empty();
    //variables to handles the city-specific data coming from the API
    let tempLevel = JSON.stringify(data.main.temp);
    let windSpeed = JSON.stringify(data.wind.speed);
    let humidityLevel = JSON.stringify(data.main.humidity);

    //take these variables and append them to the weather values card as <p> elements
    $(weatherValues).append("<p>" + "Temp: " + tempLevel + "&deg" + "F" + "</p>");
    $(weatherValues).append("<p>" + "Wind: " + windSpeed + " MPH" + "</p>");
    $(weatherValues).append("<p>" + "Humidity: " + humidityLevel + " %" + "</p>");
    
    //=============uv index===========/
    //uv index -> displayed by getUVdata funciton
    
};

//function to get coordinates required by API to get UV Index
function getCoordinates (city) {
    //UV Index
    //first have to get lat & log from geocoding api
    let coordURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=e0eb28e00a4488aba3663f43131eda5c";
    fetch(coordURL)
    .then(response => {
        //if url successful:
        if (response.ok) {
            //put repsponse as json & put into "data"
            response.json().then((coorddata) => {
                getUVdata(coorddata);
            });
        } else {
            //alert user that data was not fetched correctly by displayed status of the response
            alert("Error: " + response.statusText);
        }
    });  
};

function getUVdata(coorddata) {
    
    let uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coorddata[0].lat + "&lon=" + coorddata[0].lon + "&appid=e0eb28e00a4488aba3663f43131eda5c";
    
    fetch(uvURL)
    .then(response => {
            //put repsponse as json & put into "data"
            response.json().then((uvdata) => {
                let uvindex = uvdata.current.uvi;
                
                
                //change colors of uvindex card
                let indexcolor;
                if (uvindex > 5) {
                    indexcolor = "red";
                } else if (uvindex > 2 && uvindex < 6) {
                    indexcolor = "yellow";
                } else {
                    indexcolor = "green";
                };
                //=============uv index===========/
                $(uvDiv).empty();
                $(uvDiv).append($("<div>" + "UV Index: " + uvindex + "</div>").attr("class", "card").attr("style", ("background-color:" + indexcolor))
                .attr("class", "text-white"));
            });
        
    });  
}


/*--------------- 5 day forecast --------------*/
//api call = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}     
// apiKey = "425535dc025827a7e77aa8a4d5289d87";
// daily.weather gives daily data
function getForecast(data) {
   
    let cityID = JSON.stringify(data.id); //takes out the city "id" from data 
    console.log(cityID);
    //data in city shown as .list -> array of 40 (40 days) -> [0] = day 1 of forecast
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + data.id + "&units=imperial&appid=e0eb28e00a4488aba3663f43131eda5c";
    console.log(forecastURL);
    fetch(forecastURL)
        .then(response => {
            //if url successful:
            if (response.ok) {
            console.log(response);
            //put repsponse as json & put into "data"
            response.json().then((forecastdata) => {
                console.log(forecastdata);
                displayForecast(forecastdata);
                
            });
        } else {
            //alert user that data was not fetched correctly by displayed status of the response
            alert("Error: " + response.statusText);
        }
    });
}   

function displayForecast(forecastdata) {
    console.log(forecastdata);
    //first clear previous fourcast
    $(fiveDayTitle).empty();
    $(fiveDayCards).empty();
    
    $(fiveDayTitle).append($("<p>" + "Five Day Forecast" + "</p>").attr("class", "card-title"));
    $(fiveDayCards).append($("<div>").attr("class", "card castcardOne").attr("id", "castcardOne"));
    $(fiveDayCards).append($("<div>").attr("class", "card castcardTwo").attr("id", "castcardTwo"));
    $(fiveDayCards).append($("<div>").attr("class", "card castcardThree").attr("id", "castcardThree"));
    $(fiveDayCards).append($("<div>").attr("class", "card castcardFour").attr("id", "castcardFour"));
    $(fiveDayCards).append($("<div>").attr("class", "card castcardFive").attr("id", "castcardFive"));
    
    //dates
    //day 1
    let dayOneUnix= ((forecastdata.list[0].dt)*1000); //give me time in UNIX
    const dateOneObject = new Date(dayOneUnix)
    const dateOneFormat = dateOneObject.toLocaleString();
    const splicedDateOne = dateOneFormat.substring(0,10); //cuts out time part 
    //day 2
    let dayTwoUnix= ((forecastdata.list[8].dt)*1000); //give me time in UNIX
    const dateTwoObject = new Date(dayTwoUnix)
    const dateTwoFormat = dateTwoObject.toLocaleString(); //converts date into a string
    const splicedDateTwo = dateTwoFormat.substring(0,10); //cuts out time part 
    //day 3
    let dayThreeUnix= ((forecastdata.list[16].dt)*1000); //give me time in UNIX
    const dateThreeObject = new Date(dayThreeUnix)
    const dateThreeFormat = dateThreeObject.toLocaleString();
    const splicedDateThree = dateThreeFormat.substring(0,10); //cuts out time part 

    let dayFourUnix= new Date((forecastdata.list[24].dt)*1000); //give me time in UNIX
    const dateFourFormat = dayFourUnix.toLocaleString();
    const splicedDateFour = dateFourFormat.substring(0,10); //cuts out time part 

    let dayFiveUnix= new Date((forecastdata.list[32].dt)*1000); //give me time in UNIX
    const dateFiveFormat = dayFiveUnix.toLocaleString();
    const splicedDateFive = dateFiveFormat.substring(0,10); //cuts out time part 

    
    $("#castcardOne").append("<p>" + splicedDateOne + "</p>") 
    $("#castcardTwo").append("<p>" + splicedDateTwo + "</p>") 
    $("#castcardThree").append("<p>" + splicedDateThree + "</p>") 
    $("#castcardFour").append("<p>" + splicedDateFour + "</p>") 
    $("#castcardFive").append("<p>" + splicedDateFive + "</p>") 
    
    //icons
    let iconURLONE = "https://openweathermap.org/img/wn/" + forecastdata.list[0].weather[0].icon + ".png";
    $("#castcardOne").append($("<img>").attr("src", iconURLONE).attr("class", "btn w-25"));
    let iconURLTwo = "https://openweathermap.org/img/wn/" + forecastdata.list[8].weather[0].icon + ".png";
    $("#castcardTwo").append($("<img>").attr("src", iconURLTwo).attr("class", "btn w-25"));
    let iconURLThree = "https://openweathermap.org/img/wn/" + forecastdata.list[16].weather[0].icon + ".png";
    $("#castcardThree").append($("<img>").attr("src", iconURLThree).attr("class", "btn w-25"));
    let iconURLFour = "https://openweathermap.org/img/wn/" + forecastdata.list[24].weather[0].icon + ".png";
    $("#castcardFour").append($("<img>").attr("src", iconURLFour).attr("class", "btn w-25"));
    let iconURLFive = "https://openweathermap.org/img/wn/" + forecastdata.list[32].weather[0].icon + ".png";
    $("#castcardFive").append($("<img>").attr("src", iconURLFive).attr("class", "btn w-25"));

    //temps 
    let dayOneTemp = forecastdata.list[0].main.temp;
    let dayTwoTemp = forecastdata.list[8].main.temp;
    let dayThreeTemp = forecastdata.list[16].main.temp;
    let dayFourTemp = forecastdata.list[24].main.temp;
    let dayFiveTemp = forecastdata.list[32].main.temp;
    
    $("#castcardOne").append("<p>" + "Temp: " + dayOneTemp + "&deg" + "F" + "</p>") 
    $("#castcardTwo").append("<p>" + "Temp: " + dayTwoTemp + "&deg" + "F" + "</p>") 
    $("#castcardThree").append("<p>" + "Temp: " + dayThreeTemp + "&deg" + "F" + "</p>") 
    $("#castcardFour").append("<p>" + "Temp: " + dayFourTemp + "&deg" + "F" + "</p>") 
    $("#castcardFive").append("<p>" + "Temp: " + dayFiveTemp + "&deg" + "F" + "</p>") 

    //wind
    let dayOneWind = forecastdata.list[0].wind.speed;
    let dayTwoWind = forecastdata.list[8].wind.speed;
    let dayThreeWind = forecastdata.list[16].wind.speed;
    let dayFourWind= forecastdata.list[24].wind.speed;
    let dayFiveWind = forecastdata.list[32].wind.speed;
    
    $("#castcardOne").append("<p>" + "Wind: " + dayOneWind + " MPH" + "</p>") 
    $("#castcardTwo").append("<p>" + "Wind: " + dayTwoWind + " MPH" + "</p>") 
    $("#castcardThree").append("<p>" + "Wind: " + dayThreeWind + " MPH" + "</p>") 
    $("#castcardFour").append("<p>" + "Wind: " + dayFourWind + " MPH" + "</p>") 
    $("#castcardFive").append("<p>" + "Wind: " + dayFiveWind + " MPH" + "</p>")

    //humitiy
    let dayOneH = forecastdata.list[0].main.humidity;
    let dayTwoH = forecastdata.list[8].main.humidity;
    let dayThreeH = forecastdata.list[16].main.humidity;
    let dayFourH= forecastdata.list[24].main.humidity;
    let dayFiveH = forecastdata.list[32].main.humidity;
    
    $("#castcardOne").append("<p>" + "Humidity: " + dayOneH + " %" + "</p>") 
    $("#castcardTwo").append("<p>" + "Humidity: " + dayTwoH + " %" + "</p>") 
    $("#castcardThree").append("<p>" + "Humidity: " + dayThreeH + " %" + "</p>") 
    $("#castcardFour").append("<p>" + "Humidity: " + dayFourH + " %" + "</p>") 
    $("#castcardFive").append("<p>" + "Humidity: " + dayFiveH + " %" + "</p>")
};

/*---------------displays cities searched in past-----------*/
function displayHistory(cityHistory) {
    console.log(cityHistory);
    $("#city-history-card").html = "";
    $("#city-history-card").empty();

    //i = 1 to get rid of "null" value that keeps showing up 
    for (let i=1; i < cityHistory.length; i++) {
        let cityHistoryItem = $("<a>");
        cityHistoryItem.addClass("list-group-item");//make the link display as a list item
        //add city name to the link
        cityHistoryItem.text(cityHistory[i]);
        cityHistoryItem.attr("href");
        $("#city-history-card").append(cityHistoryItem);
        
    }
        
    console.log(cityHistory);
};

    
/*------------------ CLICK listener...grabs user entry and sends it to getWeather via 'city' variable ------------------*/

$(searchBtn).on("click", function(event) {  
    event.preventDefault(); //prevent page from refreshing 

    let city = $("#city-input").val(); //get the city name from input field
    
    //if city input is empty, do nothing
    if (city === "") {
        return;
    }

    getWeather(city); //send city to API to get weather 'data' 
    getCoordinates(city);
    
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
$("#city-history-card").on("click", ".list-group-item", function () { 
    //bring back up clicked city's weather conditions
    //define variable to hold city's name
    var searchedCity = $(this).text(); //export city's name as text
    getWeather(searchedCity);
});

