var cityList = document.querySelector("#city-list");
var cityCountSpan = document.querySelector("#city-count");
var cityForm = document.querySelector("#city-form");
var cityInput = document.querySelector("#city-text");

var cities = [];

function renderCities() {
    cityList.innerHTML = "";
    cityCountSpan.textContent = cities.length;

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = "Complete ✔️";

        li.appendChild(button);
        cityList.appendChild(li);
    }
}

function init() {
    // Get stored todos from localStorage
    var storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
      }

      renderCities();
}

function storeCities() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
  

    if (cityInput === "") {
        return;
      }

    //   cities.push(cityInput);
    //   cityInput.value = "";
    
      // Store updated todos in localStorage, re-render the list
      storeCities();
      renderCities();
    });