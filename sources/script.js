//part 1
function retrieveInformation(date) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDay = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `Current time is ${hours}:${minutes} on ${days[currentDay]}`;
}

let date = document.querySelector("#date");
let currentTime = new Date();

//date.innerHTML = retrieveInformation(currentTime);

//let searchForm = document.querySelector("#search-form");
//let dateElement = document.querySelector("#date");

// Get and display current city or location
function searchCity(event) {
  event.preventDefault();
  getCityName();
}

function getCityName(position) {
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector("h5");
  searchCity.innerHTML = searchInput.value;
  searchCity = searchInput.value;

  let endpoint = "api.openweathermap.org";
  let apiKey = "21f347fd627fde024ba524524a760ab9";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCity);
}

function displayCity(response) {
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${city}`;
}

// display current location
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

// Event listeners for buttons
let searchCityButton = document.querySelector("#search-form");
searchCityButton.addEventListener("submit", searchCity);
