// VARIABLE DECLARATIONS
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-submit");
var dayForecast = document.getElementById("current-forecast");
var cardImage = document.querySelector(".card-body");
var weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?";
var apiKey = "b204b903e2aaaf70273697cbb04e6443";
var recentCity = [];

// FUNCTIONS
// function is responsible for getting the lat/lon for the city passed
function fetchCoordinates(city) {
  // this will make the call to get the coordinates for that city
  var rootEndPoint = "http://api.openweathermap.org/geo/1.0/direct";
  var apiCall = rootEndPoint + "?q=" + city + "&appid=" + apiKey;

  fetch(apiCall)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      fetchWeather(lat, lon);
    });
}

// function is responsible for making API call with the user search term
function fetchWeather(lat, lon) {
  var weatherURL = weatherAPI + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderDayForecast(data);
      renderCards(data);
    });
}

// function responsible for displaying 5 day forecast
function renderCards(data) {
  console.log(data);
  var icon = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;

  for (let i = 1; i < data.list.length; i += 8) {
    var date = document.getElementById(`date${i}`);
    var imgEl = document.createElement("img");
    var temp = document.getElementById(`temp${i}`);
    var wind = document.getElementById(`wind${i}`);
    var humidity = document.getElementById(`humidity${i}`);

    date.textContent = data.list[i].dt_txt;
    imgEl.src = icon;
    temp.textContent = `Temp: ${data.list[i].main.temp};`;
    wind.textContent = `Wind: ${data.list[i].wind.speed}`;
    humidity.textContent = `Humidity: ${data.list[i].main.humidity}`;

    cardImage.append(imgEl);
  }
}

function renderDayForecast(data) {
  var icon = `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}.png`;

  var cityName = document.createElement("h1");
  var currentDate = document.createElement("h1");
  var imgEl = document.createElement("img");
  var currentTemp = document.createElement("h1");
  var wind = document.createElement("h1");
  var humidity = document.createElement("h1");

  cityName.textContent = data.city.name;
  currentDate.textContent = data.list[0].dt_txt;
  currentTemp.textContent = data.list[0].main.temp;
  imgEl.src = icon;
  wind.textContent = data.list[0].wind.speed;
  humidity.textContent = data.list[0].main.humidity;

  dayForecast.append(cityName);
  dayForecast.append(currentDate);
  dayForecast.append(currentTemp);
  dayForecast.append(imgEl);
  dayForecast.append(wind);
  dayForecast.append(humidity);
}

// This function is responsible for form submission by capturing user input
function handleFormSubmit(e) {
  e.preventDefault();
  var cityInput = userInput.value;
  fetchCoordinates(cityInput);
  setLocalStorage(cityInput);
}

// EVENT LISTENERS
userForm.addEventListener("submit", handleFormSubmit);

// LOCAL STORAGE
function setLocalStorage(city) {
  var recentInput = [];
  recentInput.push(city);
  localStorage.setItem("city", JSON.stringify(city));
}

var recentButton = document.querySelector("#recent-button");
recentButton.addEventListener("click", getLocalStorage);

function getLocalStorage() {
  recentButton.textContent = localStorage.getItem("city");
}
