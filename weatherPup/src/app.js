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


//Function to get the search icon to submit instead of a using a button.
function showWeather(response) {
console.log(response);
}

//Stops normal submit and refresh behavior
function getCity(event) {
  event.preventDefault();
  let userEntry = document.querySelector("#userCity").value;
  requestCityWeather(userEntry);
}

function requestCityWeather(userEntry) {
  let devKey = "3711439e85a5b0487eab981ef384735a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${userEntry}&appid=${devKey}`;
  axios.get(apiUrl).then(showWeather);

function activate() {
  document.querySelector("form").requestSubmit();
}


  searchIcon.addEventListener("click", activate);
searchForm.addEventListener("submit", getCity);

//currentWIcon.innerHTML = `<img src="images/icons/${currentIcon}.png" class="lgIcon" />`;
//let currentWIcon = document.getElementById("currentWeatherIcon");
////