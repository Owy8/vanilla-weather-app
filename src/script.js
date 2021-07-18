function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celciusTemp = response.data.main.temp;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let cityName = "Toronto";
let apiKey = "146a2d6b6ac247d05289f4e367d16448";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

//forecast
function getForecast(coordinates) {
  let apiKey = "146a2d6b6ac247d05289f4e367d16448";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHtml = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="col-2">
      <div class="daily-date">${day}</div>
      <img
        src="https://openweathermap.org/img/wn/10d@2x.png"
        alt="img"
        width="42"
      />
      <div class="daily-forecast-temp">
        <span class="daily-forecast-temp-max">18</span>
        <span class="daily-forecast-temp-min">12</span>
      </div>
    </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let cityInput = document.querySelector("#input-city");
  searchInput.innerHTML = cityInput.value;

  let apiKey = "146a2d6b6ac247d05289f4e367d16448";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "146a2d6b6ac247d05289f4e367d16448";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
form.addEventListener("click", search);

// fahrenheit
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round((celciusTemp * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#temp-f");
fahrenheit.addEventListener("click", convertFahrenheit);
let celciusTemp = null;
// celcius
function convertCelcius(event) {
  event.preventDefault();
  let celciusElement = document.querySelector("#temperature");
  celciusElement.innerHTML = Math.round(celciusTemp);
}
let celcius = document.querySelector("#temp-c");
celcius.addEventListener("click", convertCelcius);

// current
function searchNavigator() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentPosition = document.querySelector("#current-button");
currentPosition.addEventListener("click", searchNavigator);
