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
  dayNTime.innerHTML = `${weekDay} ${hour}:${minutes}`;
}

//Feature #2
//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

let searchForm = document.getElementById("searchF");
let userLocal = document.getElementById("userCity");
let searchIcon = document.getElementById("submitSearch");
let update = document.getElementById("updateCity");

function activate() {
  document.querySelector("form").requestSubmit();
}

function reroute(event) {
  event.preventDefault();
  let userLocal = document.getElementById("userCity");
  let update = document.getElementById("updateCity");
  if (userLocal.value.length > 3) {
    update.innerHTML = `Searching for ${userLocal.value}...`;
  } else {
    alert("Please enter a valid city");
  }
}

searchIcon.addEventListener("click", activate);
searchForm.addEventListener("submit", reroute);

//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//Code it inside VS Code or Sandbox. Move your code into a CodeSandbox and submit the URL of the working version.
let farenToggle = document.getElementById("farenheit");
let celsiusToggle = document.getElementById("celsius");
let farenTemp = document.getElementById("test");
farenTemp.innerHTML = "30°/22°";

function farenTempDisplay() {
  farenTemp.innerHTML = "30°/22°";
}
function celsiusTemp() {
  farenTemp.innerHTML = "-1°/-3°";
}

farenToggle.addEventListener("click", farenTempDisplay);
celsiusToggle.addEventListener("click", celsiusTemp);
