function loadPage() {
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
    
    function displayWeather(data) {
        //city name
        let cityName = data.name; //takes "name" from the data object
        console.log(cityName);
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

    
                        //uv index
        //********END OF FIRST FETCH *************
           

    /**********END OF getWeather FUNCTION**********/
    
        
    //add city search button eventlistener
    $("#searchBtn").on("click", function () {
        let city = $("#city").val(); //get the city name from input field
        
        getWeather(city); //display the current weather
        //store searched city into local storage --> localStorage.setItem (keyName, keyValue) per MDN
        //keyName = ?, keyValue = city
        cityArray.push(city);
        console.log(cityArray);
        localStorage.setItem(city, cityArray);
        //localStorage.setItem("city", JSON.stringify(cityArray));
    
        //run these funcitons
        
        displayHistory();  //function that deals with storing and displaying searched cities
        $("#city").val(""); //clear input field after it's displayed & stored
    
    });
    
    function displayHistory() {
    
        //make searched cities into an array (cityArray = []) & push each city into the array
       
        
        
    
        //pull cityArray out of localstorage
        let storedCities = localStorage.getItem (cityArray);
        //let storedCities = JSON.parse(localStorage.getItem("city"));
        console.log(storedCities);
        console.log(cityArray);
    
        //loop through storage until all stored cities are displayed (max of 6)
        for (let i=0; i < storedCities.length; i++) {
            
            //display city as a list item that links to weather of that city if clicked on
            $(searchHistory).append("<a>" + storedCities[i] + "</a>");
            $("a").addClass("list-item");
            $("a").attr("apiUrl");
    
        }
    };
    
    
    

};    

loadPage();