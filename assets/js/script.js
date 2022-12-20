var cityHistory = document.querySelector("#city-history");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");
var clearHistory = document.querySelector("#clear-button");
var submitBtn = document.querySelector("#submit-button")

var todayDate = document.getElementById("today-date");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumid = document.getElementById("today-humidity");
var icon = document.getElementById("current-icon");
var cityName = document.getElementById("city-name");




var day0Temp = document.getElementById("day0-temp");



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
    console.log(data);
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
         for (var i=0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.slice(11, 13) == "12") {
            days.push(data.list[i]);
          }
         }

        // console.log(days);
        // console.log(data);
      });
  }
  var displayTodayWeather = function (data) {
    
    var cityName = data.name;
    var icon = data.weather.icon;
    var todayTemp = data.main.temp;
    var todayWind = data.wind.speed
  
  console.log(cityName, icon, todayTemp, todayWind);
  cityName.innerText = cityInput;
  
  }




  // var day1Temp = document.querySelector("#day1-temp");
  // var day2Temp = document.querySelector("#day2-temp");
  


//  get cities from local storage
  submitBtn.addEventListener("click", function (){
  var searchTerm = cityInput.value;
  getLatLon(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
})


//  clear history button
clearHistory.addEventListener("click", function (){
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
})



function renderSearchHistory() {
    cityHistory.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "form-control d-block bg-white");
      historyItem.setAttribute("click", function (){
        // getWeatherData(historyItem.value);
      });
      cityHistory.append(historyItem);
    }
}





// Get current request from API


function displayWeather(event) {
  event.preventDefault();
  if(cityInput.val().trim()!==""){
    cityName = cityInput.val().trim();
    getWeatherData(weatherCity);
  }
}