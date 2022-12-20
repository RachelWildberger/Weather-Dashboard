var cityHistory = document.querySelector("#city-history");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");
var clearHistory = document.querySelector("#clear-button");
var submitBtn = document.querySelector("#submit-button")
var city="";

var APIKey = "a34bef93ccd653626bea99311ab551c5";

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function getLatLon(name) {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      getWeatherData(lat, lon);
      // console.log(data);
    });
}

function getWeatherData(lat, lon) {

  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var days = [];
      for (var i = 0; i < data.list.length; i++) {

        if (data.list[i].dt_txt.slice(11, 13) == "12") {
          days.push(data.list[i]);
        }
      }
      console.log(days);
    });
}


// create a function outside of displayTodayWeather 
// inside this function put HTML variables & data variables, move out of displaytodayWeather and move into new function
// inside that function change text content to each element to whatever the data is refrence line 95
// then call new function inside second .then of fetch (refrence line 85)

function displayTodayWeather(data) {

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + data + "&units=imperial&appid=" + APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderTodayWeather(data);
      // console.log(renderTodayWeather);  
    });

}

function renderTodayWeather(data) {

  // var todayDateEl = document.getElementById("today-date");
  var todayTempEl = document.getElementById("today-temp");
  var todayWindEl = document.getElementById("today-wind");
  var todayHumidEl = document.getElementById("today-humidity");
  var iconUrlEl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
  var cityNameEl = document.getElementById("city-name");

  // var date = 
  var cityName = data.name;
  var iconCode = data.weather[0].icon;  
  var todayTemp = data.main.temp;
  var todayWind = data.wind.speed;
  var todayHumid = data.wind.speed;

  todayTempEl.textContent = `Temp: ${todayTemp} °`;
  todayWindEl.textContent = `Wind: ${todayWind} MPH`;
  iconUrlEl.textContent = ` ${iconCode}`;
  todayHumidEl.textContent = `Humidity: ${todayHumid} %`;
  cityNameEl.textContent = `${cityName}`;

  console.log("Todays weather data" , data);

}


//  get cities from local storage
submitBtn.addEventListener("click", function () {
  var searchTerm = cityInput.value;
  getLatLon(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
  displayTodayWeather(searchTerm);
})


//  clear history button
clearHistory.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
})



function renderSearchHistory() {
  cityHistory.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var cityQueue = document.createElement("input");
    cityQueue.setAttribute("type", "text");
    cityQueue.setAttribute("readonly", true);
    cityQueue.setAttribute("class", "form-control d-block bg-white");
    cityQueue.setAttribute("click", function () {
      // getWeatherData(cityQueue.value);
    });
    cityHistory.append(cityQueue);
  }
}

// Get current request from API


function displayWeather(event) {
  event.preventDefault();
  if (cityInput.val().trim() !== "") {
    cityName = cityInput.val().trim();
    getWeatherData(weatherCity);
  }
}