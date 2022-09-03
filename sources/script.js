//function searchTemperature(response) {
//let temperature = Math.round(response.data.main.temp);
// let h5 = document.querySelector("h5");
//h5.innerHTML = `The temperature for your city is ${temperature}`;
//}

//the only way the apiURL works is if I have it like this. As soon as I change the appid and declare my key or declare lat/lon it gives me a 401 error code.
//function findLocation(position) {
//let apiKey = f1a9cf2d1d5190158a907ba1ed5b96af;
//let latitude = position.coords.latitude;
//let longitude = position.coords.longitude;
//let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=f1a9cf2d1d5190158a907ba1ed5b96af`;

// axios.get(apiURL).then(findLocation);
//}

//navigator.geolocation.getCurrentPosition(findLocation);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1a9cf2d1d5190158a907ba1ed5b96af&units=${units}`;

  axios.get(apiURL).then(displayCity);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function displayCity(response) {
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${city}`;
}
