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

  if (hours > 11) {
    return `${day}    ⏰${hours}:${minutes}`;
  } else {
    return `${day}    ⏰${hours}:${minutes}`;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function search(city) {
  let endpoint = "api.openweathermap.org";
  let apiKey = "21f347fd627fde024ba524524a760ab9";
  let apiUrl = `https://${endpoint}/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  let humidityData = response.data.main.humidity;
  let fahrenheitTemperature = Math.round(response.data.main.temp);
  let windSpeed = response.data.wind.speed;

  let tempMessage = `Temperature: ${fahrenheitTemperature}º`;
  let windSpeedMessage = `Speed: ${windSpeed} mph`;
  let humidityMessage = `Humidity: ${humidityData}%`;

  wind.innerHTML = windSpeedMessage;
  humidity.innerHTML = humidityMessage;
  temperature.innerHTML = tempMessage;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weekForecast");
  console.log(forecastElement);
  let forecastHTML = `<div class="row" id="forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}º </span> <br/>
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}º </span>
              </div>
              <div class="weatherIcon"><img 
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
                       alt=""
                       width="42"
                    />
              </div>
      </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("search-form");
addEventListener("submit", handleSubmit);

let searchButton = document.querySelector(".searchCityButton");
searchButton.addEventListener("submit", handleSubmit);

search("Paris");
