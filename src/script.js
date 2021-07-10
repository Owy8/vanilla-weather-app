function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  escriptionElement = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "146a2d6b6ac247d05289f4e367d16448";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={cityName}&appid=${apiKey}&units=metric`;
let cityName = "London";

axios.get(apiurl).then(displayTemperature);
