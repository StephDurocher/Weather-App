function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayOfWeek = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[dayOfWeek];
}

//search and display city

function searchCity(city) {
  let endpoint = "api.openweathermap.org";
  let apiKey = "21f347fd627fde024ba524524a760ab9";
  let city = "";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${city}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
  city.innerHTML = response(`Current weather in ${city}`);
}
let searchButton = document.querySelector(".searchCityButton");
searchButton.addEventListener("submit", searchCity);

function displayCity(position) {
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
  city = searchInput.value;

  let endpoint = "api.openweathermap.org";
  let apiKey = "21f347fd627fde024ba524524a760ab9";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayCity);
}

// display temperature
function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#display-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// F | C links
//function showCelciusTemperature(event) {
// event.preventDefault();
//}
//function showFahrenheitTemperature(event) {
// event.preventDefault();
//}

//let celciusLink = document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", showCelciusTemperature);
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
