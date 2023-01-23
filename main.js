

// Get the element id from the HTML and store it in a variable to use with function
let weatherResult = document.getElementById("weather-result");
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");


// Function to get Weather data from the OpenWeatherMap API
async function getWeather() {
  // Get the city or zip code input from the user
  let city = cityInput.value;
  var url;
  // Check if the input is a city name or a zip code
  if (isNaN(city)) {
    // If it is a city name, get the weather data for that city
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  } else {
    // If it is a zip code, get the weather data for that zip code
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${city}&appid=${API_KEY}`;
  }
  try {
    // Get the weather data from the API
    const response = await fetch(url);
    const data = await response.json();
    // Get the specific weather data
    let cityName = data.name;
    let temperature = data.main.temp;
    let feelsLike = data.main.feels_like;
    let tempMax = data.main.temp_max;
    let tempMin = data.main.temp_min;
    let sky = data.weather[0].main;
    let weDes = data.weather[0].description;
    let icon = data.weather[0].icon;
    // Temp conversion from Kelvin to Fahrenheit
    let fahTemp = Math.round((temperature - 273.15) * 1.8) + 32;
    let fahFeelsLike = Math.round((feelsLike - 273.15) * 1.8) + 32;
    let fahMax = Math.round((tempMax - 273.15) * 1.8) + 32;
    let fahMin = Math.round((tempMin - 273.15) * 1.8) + 32;
    // Add HTML elements with the weather data to display
    weatherResult.innerHTML = `
        <p id="city">${cityName}</p>
        <p id="temp">${fahTemp}&#176F</p>
        <pre id="feels-like">Feels Like:
        <b>${fahFeelsLike}&#176F</b></pre>
        <pre id="high">High:
        <b>${fahMax}&#176F</b></pre>
        <pre id="low">Low:
        <b>${fahMin}&#176F</b></pre>
        <pre id="sky">${sky}</pre>
        <p id="desc">${weDes}</p>
        <image id="icon" src="http://openweathermap.org/img/w/${icon}.png"></image>
        `;
  } catch (error) {
    console.log(error);
  }
}

// Added an event listener to the search button to call the "getWeather" function when clicked
searchButton.addEventListener("click", getWeather);