function searchTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h5 = document.querySelector("h5");
  h5.innerHTML = `The temperature for your city is ${temperature}`;
}

function findLocation(position) {
  //let latitude = position.coords.latitude;
  //let longitude = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=f1a9cf2d1d5190158a907ba1ed5b96af`;
  console.log(apiURL);

  axios.get(apiURL).then(findLocation);
}

navigator.geolocation.getCurrentPosition(findLocation);
