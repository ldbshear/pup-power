//Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16:00

setInterval(dayClock, 1000);
function dayClock() {
  const currentTime = new Date();
  let weekDay = currentTime.getDay();
  let minutes = currentTime.getMinutes();

  let hour = currentTime.getHours();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hour > 12) {
    hour = hour - 12;
  }

  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  weekDay = week[currentTime.getDay()];
  const dayNTime = document.getElementById("dayTime");
  dayNTime.textContent = `${weekDay} ${hour}:${minutes}`;
}

//Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

let searchForm = document.getElementById("searchForm");
let searchIcon = document.getElementById("submitSearch");
let geoHouse = document.getElementById("geoHouse");
let getCelsius = document.getElementById("celsius");
let getFarenheit = document.getElementById("farenheit");
let devKey = "3711439e85a5b0487eab981ef384735a";

///Function to get the user permission for geolocation
function requestPosition() {
  navigator.geolocation.getCurrentPosition(getCoordinates);
  function getCoordinates(position) {
    let geoLat = position.coords.latitude;
    let geoLng = position.coords.longitude;

    function displayGeoLocal(response) {
      if (response === null) return;
      let update = document.getElementById("updateCity");
      let currentWeatherDetails = document.getElementById(
        "currentWeatherDetails"
      );
      let currentTemp = document.getElementById("hiTemp");
      let currentWind = document.getElementById("wind");
      let currentHumidity = document.getElementById("humidity");
      let currentWIcon = document.getElementById("currentWeatherIcon");
      console.log(response);
      update.textContent = `Your location is ${response.data.name}`;
      let currentIcon = response.data.weather[0].icon;
      currentWeatherDetails.textContent =
        `${response.data.weather[0].description}`.toUpperCase();
      currentTemp.textContent = `${Math.round(response.data.main.temp)}°`;
      currentWind.textContent = `Wind speed: ${response.data.wind.speed}`;
      currentHumidity.textContent = `Humidity: ${response.data.main.humidity}`;
      currentWIcon.innerHTML = `<img src="images/icons/${currentIcon}.png" class="lgIcon" />`;
    }

    let geoURL = `http://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLng}&units=metric&appid=${devKey}`;
    axios.get(geoURL).then(displayGeoLocal);
  }
}

//Function to get the search icon to submit instead of a using a button.
function activate() {
  document.querySelector("form").requestSubmit();
}

//Stops normal submit and refresh behavior
function reroute(event) {
  event.preventDefault();
  let userLocal = document.getElementById("userCity");
  let update = document.getElementById("updateCity");

  userLocal = userLocal.value;

  //Returns data from axios, declares new variables to hold proper format for the next axios request
  function show(response) {
    if (response === null) return;

    //if response from axios does not return a state, attach country name and display location
    if (response.data[0].state !== undefined) {
      update.textContent = `${response.data[0].name}, ${response.data[0].state}`;
    } else {
      update.textContent = `${response.data[0].name}, ${response.data[0].country}`;
    }

    const currentLat = response.data[0].lat;
    const currentLong = response.data[0].lon;

    //Displays current weather in Imperial and fetches weather icon
    function displayCurrent(response) {
      let currentWeatherDetails = document.getElementById(
        "currentWeatherDetails"
      );
      let currentTemp = document.getElementById("hiTemp");
      let currentWind = document.getElementById("wind");
      let currentHumidity = document.getElementById("humidity");
      let currentWIcon = document.getElementById("currentWeatherIcon");

      if (response == null) return;
      let currentIcon = response.data.weather[0].icon;
      currentWeatherDetails.textContent =
        `${response.data.weather[0].description}`.toUpperCase();
      currentTemp.textContent = `${Math.round(response.data.main.temp)}°`;
      currentWind.textContent = `Wind speed: ${response.data.wind.speed}`;
      currentHumidity.textContent = `Humidity: ${response.data.main.humidity}`;
      currentWIcon.innerHTML = `<img src="images/icons/${currentIcon}.png" class="lgIcon" />`;
    }
    function returnCelsius() {
      let url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&units=metric&appid=${devKey}`;
      axios.get(url).then(displayCurrent);
    }
    getFarenheit.addEventListener("click", reroute);
    getCelsius.addEventListener("click", returnCelsius);

    let displayWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&units=imperial&appid=${devKey}`;
    axios.get(displayWeatherUrl).then(displayCurrent);
  }
  //Request for the user location to be converted from city name to latitude and longitude
  let formatURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userLocal}&limit=3&appid=${devKey}`;
  axios.get(formatURL).then(show);
}
geoHouse.addEventListener("click", requestPosition);
searchIcon.addEventListener("click", activate);
searchForm.addEventListener("submit", reroute);

//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//Code it inside VS Code or Sandbox. Move your code into a CodeSandbox and submit the URL of the working version.
