let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let month = months[now.getMonth()];
h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast")

  let forecastHTML = `<div class="row">`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML + `
  <div class="col-2">
    <div class="Forecast-date">${day}</div>
    <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="42" />
    <div class="Week-forecast-temperatures">
      <span class="Forecast-temperature-max"> 18° |</span>
      <span class="Forecast-temperature-min"> 12° </span>
    </div>
  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(response) {
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature-number")

  
  celsiusLink = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusLink);
  cityElement.innerHTML = cityInput.value;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  descriptionElement.innerHTML = ("alt", response.data.weather[0].description);
}

function handleSearch(city) {
  let apiKey = "cd876a10c23602b6fbd5ba8f87584931";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(search);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  handleSearch(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-number");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-number");
  temperatureElement.innerHTML = Math.round(celsiusLink);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);   

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

displayForecast();

function getCurrentLocation(event) {
  event.preventDefault();
}
let celsiusTemperature = null

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);;