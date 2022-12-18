var cityHistory = document.querySelector("#city-history");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");
var clearHistory = document.querySelector("#clear-button");
var submitBtn = document.querySelector("#submit-button")
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

//  get cities from local storage
submitBtn.addEventListener("click", function(){
  var search = cityInput.value;
  getWeatherData(search);
  searchHistory.push(search);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
})


//  clear history button
clearHistory.addEventListener("click", function (){
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
  console.log("click");
})



function renderSearchHistory() {
    cityHistory.innerHTML = "";
    for (var i = 0; i < searchHistory.length; i++) {
      var historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "form-control d-block bg-white");
      historyItem.setAttribute("click", function (){
        getWeatherData(historyItem.value);
      });
      cityHistory.append(historyItem);
    }
}
renderSearchHistory();
    if (searchHistory.length > 0){
      getWeatherData(searchHistory[searchHistory.length - 1]);
}




// Todays highlights
var APIKey = "a34bef93ccd653626bea99311ab551c5";

function displayWeather(event) {
  event.preventDefault();
  if(cityInput.val().trim()!==""){
    cityName = cityInput.val().trim();
    getWeatherData(weatherCity);
  }
}




function getWeatherData(cityName) {
  // var {lat} = cityName;
  // var {lon} = cityName;
  // var cityName = location.name;

  // var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=33.44&lon=-94.04&units=imperial&appid=${APIKey}`;
  
  // var lat = cityName.coord.lat;
  // var lon = cityName.coord.lon;

      fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }

  getWeatherData();

// var todayHighlights = document.querySelector("#today-highlights");
// var todayTemp = document.querySelector("#today-temp");
// var todayWind = document.querySelector("#today-wind");
// var todayHumidity = document.querySelector("#today-humidity");





// var changeToImperial = `https://api.openweathermap.org//data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

// function getCoordinates(search) {

//   var coordsUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;

//   fetch(coordsUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     if (!data[0]) {
//       alert("Error location not found!");
//     } else {
//       getWeatherData(data[0]);
//       console.log(data[0]);
//     }
//   }).catch(function(error){
//     console.log(error);
//   })


