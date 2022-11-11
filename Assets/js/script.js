// VARIABLE DECLARATIONS
var userInput = document.getElementById("user-input");
var userForm = document.getElementById("form-sbt");
var dayForcast = document.getElementById("current-forcast");

var weatherAPI = ""
var apiKey = ""

// FUNCTIONS
functionrenderCards() {
    // DOM manipulation
}

// function is responsible for getting the lat/lon for the city passed
function fetchCoordinates(city) {
    // this will make the call to get the coordinates for that city
    var rootEndPoint = "website"
    var apiCall = "rootEndPoint" + "q=" + city + "&appid" + apiKey

    fetch(apiCall)
        .then(function (response) {
            return response.json()
        })  
        .then(function (data) {
            var lat = data[0].lat
            var lon = data[0].lon
            fetchWeather(lat, lon)
        })
}

// function is responsible for making API call with the user search term
function fetchWeather(lat, lon) {
    var apiCall = weatherAPI + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey
    fetch()
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // take the temp and lets display to the user an h1
            var h1El = document.createElement("h1")
            h1El.textContent = data.list[0].main.temp
            // append to DOM
            dayForcast.append(h1El)
        });
    
    // render the temp as an h1 to the user

}

// This function is responsible for form submission by capturing user input
function handleFormSubmit(e) {
    e.preventDefault()

var input = userInput.value

    // make an api call with that search term and confirm data is sent back
    fetchWeather(input)
}



// EVENT LISTENERS

userForm.addEventListener("submit, handleFormSubmit")


// LOCAL STORAGE
// creat an empty array
// push that value(name of the city) to that array
localStorage.getItem("cities")
localStorage.setItem("cities", "array of cities")
// var cities = ["Austin", "Denver", "Seattle"]