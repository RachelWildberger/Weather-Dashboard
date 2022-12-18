var cityList = document.querySelector("#city-list");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");


var cities = [];

function renderCities() {
  cityList.innerHTML = "";

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Search";

    // li.appendChild(button);

    cityList.appendChild(li);
  }
}

function init() {
  // Get stored city from localStorage
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;
  }

  renderCities();
}

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

cityForm.addEventListener("click", function (event) {
  event.preventDefault();

  var cityText = cityInput.value.trim();

  if (cityText === "") {
    return;
  }

  cities.push(cityText);
  cityInput.value = "";

  // Store updated cities in localStorage, re-render the list
  storeCities();
  renderCities();
});

cityList.addEventListener("click", function(event) {
var element = event.target;

if (element.matches("button") === true) {
    // Get its data-index value and remove the city element from the list
    var index = element.parentElement.getAttribute("data-index");
    cities.splice(index, 1);

    storeCities();
    renderCities();
  }
});

init()


var cityName="";
var weatherCity = document.querySelector("#weather-city");



// Todays highlights
var APIKey = "a34bef93ccd653626bea99311ab551c5";

function displayWeather(event) {
  event.preventDefault();
  if(cityInput.val().trim()!==""){
    cityName = cityInput.val().trim();
    getWeatherData(weatherCity);
  }
}



function getWeatherData() {
  // var {lat} = cityName;
  // var {lon} = cityName;
  // var cityName = location.name;

  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=33.44&lon=-94.04&units=imperial&appid=${APIKey}`;


  // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

  
  // var lat = cityName.coord.lat;
  // var lon = cityName.coord.lon;

      fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var i = 0; i < data.length; +ii) {
          
        }
      })
}

var todayHighlights = document.querySelector("#today-highlights");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");





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