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
    
        li.appendChild(button);

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

  cityForm.addEventListener("click", function(event) {
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

        // cityList.addEventListener("click", function(event) {
        // var element = event.target;

        // if (element.matches("button") === true) {
        //     // Get its data-index value and remove the city element from the list
        //     var index = element.parentElement.getAttribute("data-index");
        //     cities.splice(index, 1);

        //     storeCities();
        //     renderCities();
        //   }
        // });

    init()