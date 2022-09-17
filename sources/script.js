function formatDate(timestamp) {
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

function search(city) {
  let endpoint = "api.openweathermap.org";
  let apiKey = "21f347fd627fde024ba524524a760ab9";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${city}&appid=${apiKey}&unit=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}
let searchButton = document.querySelector(".searchCityButton");
searchButton.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  fahrenheitTemperature = response.data.main.temp;

  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let form = document.querySelector("search-form");
addEventListener("submit", handleSubmit);
// F | C links
let fahrenheitTemperature = null;

//function showCelciusTemperature(event) {
//event.preventDefault();
//}
//function showFahrenheitTemperature(event) {
// event.preventDefault();
//}

//let celciusLink = document.querySelector("#celcius-link");
//celciusLink.addEventListener("click", showCelciusTemperature);
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
