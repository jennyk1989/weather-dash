//weather dashboard with form inputs (mostly HTML)

//search for a city, then presented with current & future condition

//search for a city & it's added to search history

//when viewing city's current weather conditions, see name, date, icon representing conditions, temp, humidity, wind speed, uv index

//when view uv index --> presented with a color that indicates favorable, moderate, or severe conditions

//when viewing city's future weather conditions, see a 5 day forecast
//5day forecast displays date, icon of weather conditions, temp, wind speed, humidity

//click on city in search history & then current & future conditions for that city are displayed

//OPEN WEATHER API INFO
// API CALL = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
/* 
API Calls
-by city name --> api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


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
