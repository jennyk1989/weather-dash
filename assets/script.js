//variables
let searchBtn = $("#search-button");
//get out of local storage...store in array that's in addition to stored cities or in the empty array
let cityHistory = JSON.parse(localStorage.getItem("city")) || []; //parse stored data to get out of string format


/*------------------ FUNCTION to get DATA from OPEN WEATHER API ------------------*/
//"city" value comes from input field 
function getWeather (city) {
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
//relevant variables
const cityName = $("#city-name");
const cityDateIcon = $("#city-date-icon");
const cityDate = $("#city-date");
const weatherIcon = $("#weather-icon")
const dateDiv = $("#dateDiv")
const weatherValues = $("#weather-values");
const uvDiv = $("#uv-div");

function displayWeather(data) {
    //========== city icon date ==================
    $(cityName).empty();
    $(cityDate).empty();
    $(uvDiv).empty();
    $("#hide-me").hide();
    //city
    $(cityName).append("<p>" + data.name + "</p>");
   
    
    //date
    let currentDate = moment().format("dddd, MMM, Do, YYYY");
    $(cityDate).append("<p>" + currentDate + "</p>");

    //icon
    let iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    $(weatherIcon).append($("<img>").attr("src", iconURL));

    //============= weather values ================/
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
    $("#day-one").empty();
    //$(fiveDayCards).empty();
    
    // $(fiveDayCards).append($("<div>").attr("class", "card castcardOne").attr("id", "castcardOne"));
    // $(fiveDayCards).append($("<div>").attr("class", "card castcardTwo").attr("id", "castcardTwo"));
    // $(fiveDayCards).append($("<div>").attr("class", "card castcardThree").attr("id", "castcardThree"));
    // $(fiveDayCards).append($("<div>").attr("class", "card castcardFour").attr("id", "castcardFour"));
    // $(fiveDayCards).append($("<div>").attr("class", "card castcardFive").attr("id", "castcardFive"));
    
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

    
    $("#day-one").append("<p>" + splicedDateOne + "</p>") 
    $("#day-two").append("<p>" + splicedDateTwo + "</p>") 
    $("#day-three").append("<p>" + splicedDateThree + "</p>") 
    $("#day-four").append("<p>" + splicedDateFour + "</p>") 
    $("#day-five").append("<p>" + splicedDateFive + "</p>") 
    
    
    //icons
    let iconURLONE = "https://openweathermap.org/img/wn/" + forecastdata.list[0].weather[0].icon + ".png";
    $("#icon-one").append($("<img>").attr("src", iconURLONE));
    let iconURLTwo = "https://openweathermap.org/img/wn/" + forecastdata.list[8].weather[0].icon + ".png";
    $("#icon-two").append($("<img>").attr("src", iconURLTwo).attr("class", "btn w-25"));
    let iconURLThree = "https://openweathermap.org/img/wn/" + forecastdata.list[16].weather[0].icon + ".png";
    $("#icon-three").append($("<img>").attr("src", iconURLThree).attr("class", "btn w-25"));
    let iconURLFour = "https://openweathermap.org/img/wn/" + forecastdata.list[24].weather[0].icon + ".png";
    $("#icon-four").append($("<img>").attr("src", iconURLFour).attr("class", "btn w-25"));
    let iconURLFive = "https://openweathermap.org/img/wn/" + forecastdata.list[32].weather[0].icon + ".png";
    $("#icon-five").append($("<img>").attr("src", iconURLFive).attr("class", "btn w-25"));

    //temps 
    $("#weather-one").append("<p>" + "Temp: " + forecastdata.list[0].main.temp + "&deg" + "F" + "</p>") 
    $("#weather-two").append("<p>" + "Temp: " + forecastdata.list[8].main.temp + "&deg" + "F" + "</p>") 
    $("#weather-three").append("<p>" + "Temp: " + forecastdata.list[16].main.temp + "&deg" + "F" + "</p>") 
    $("#weather-four").append("<p>" + "Temp: " + forecastdata.list[24].main.temp + "&deg" + "F" + "</p>") 
    $("#weather-five").append("<p>" + "Temp: " + forecastdata.list[32].main.temp + "&deg" + "F" + "</p>") 

    //wind
    $("#weather-one").append("<p>" + "Wind: " + forecastdata.list[0].wind.speed + " MPH" + "</p>") 
    $("#weather-two").append("<p>" + "Wind: " + forecastdata.list[8].wind.speed + " MPH" + "</p>") 
    $("#weather-three").append("<p>" + "Wind: " + forecastdata.list[16].wind.speed + " MPH" + "</p>") 
    $("#weather-four").append("<p>" + "Wind: " + forecastdata.list[24].wind.speed + " MPH" + "</p>") 
    $("#weather-five").append("<p>" + "Wind: " + forecastdata.list[32].wind.speed + " MPH" + "</p>")

    //humitiy
    $("#weather-one").append("<p>" + "Humidity: " + forecastdata.list[0].main.humidity + " %" + "</p>") 
    $("#weather-two").append("<p>" + "Humidity: " + forecastdata.list[8].main.humidity + " %" + "</p>") 
    $("#weather-three").append("<p>" + "Humidity: " + forecastdata.list[16].main.humidity + " %" + "</p>") 
    $("#weather-four").append("<p>" + "Humidity: " + forecastdata.list[24].main.humidity + " %" + "</p>") 
    $("#weather-five").append("<p>" + "Humidity: " + forecastdata.list[32].main.humidity + " %" + "</p>")
};

/*---------------displays cities searched in past-----------*/
function displayHistory(cityHistory) {
    console.log(cityHistory);
    //$("#history-panel").html = "";
    //$("#history-panel").empty();

    //i = 1 to get rid of "null" value that keeps showing up 
    for (let i=1; i < cityHistory.length; i++) {
        let historyDiv = $("<div>").addClass("panel-block");
        $("#history-panel").append(historyDiv);
        let historyButton = $("<button>" + cityHistory[i] + "</button>").addClass("button is-info is-fullwidth");
        $(historyDiv).append(historyButton);
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

