var searchInputEl = document.querySelector(".search-input");
var searchResult = document.querySelector(".search-result");
var btn = document.querySelector(".search-button");
var localStorageEl = document.querySelector(".local-storage");
var currentEl = document.querySelector(".current");
var btnForLS;
var city;
var searchHistories = [];
//var weatherIdUrl = "https://openweathermap.org/img/wn/" + weatherId + "@2x.png";
var weatherId;

function getAPI(city) {
  //var url ='https://api.openweathermap.org/data/2.5/forecast/?q=Tokyo&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f'
  //var url = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + city + '&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f';
  var url =
    "https://api.openweathermap.org/data/2.5/forecast/?q=" +
    city +
    "&appid=bd37527bc5df3c28cf62f2c192bc2e9f";

  fetch(url)
    .then(function (response) {
      if (response.ok == false) {
        window.alert("please input city name!");
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      console.log(typeof data);
      console.log("weather: " + data.list[0].weather[0].main); //weather(clear cloud, rain)
      console.log("temp: " + data.list[0].main.temp); //temp
      console.log("humidity: " + data.list[0].main.humidity);
      console.log("wind: " + data.list[0].wind.speed);

      saveHistories();

      // create HTML elements for weather information
      var iconId = data.list[0].weather[0].icon;
    var iconUrl = 'https://openweathermap.org/img/wn/'+ iconId +'@2x.png'
      console.log(data.list[0].weather[0].icon);

      var cityNameEl = document.createElement("h3");
      cityNameEl.textContent = city + ": " + dayjs().format("M/D/YYYY");

      var weatherDescEl = document.createElement("p");
      var iconEl =document.createElement('img');
      iconEl.setAttribute('src', iconUrl)
      weatherDescEl.textContent = data.list[0].weather[0].main;
      
      var tempEl = document.createElement("p");
      tempEl.textContent =
        "Temperature: " +
        parseInt(((data.list[0].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";

      var humidityEl = document.createElement("p");
      humidityEl.textContent = "Humidity: " + data.list[0].main.humidity + " %";

      var windEl = document.createElement("p");
      windEl.textContent = "Wind Speed: " + data.list[0].wind.speed + "MPH";

      // append the created elements to the '.current' div
      currentEl.innerHTML = "";
      currentEl.appendChild(cityNameEl);
      currentEl.appendChild(weatherDescEl);
      currentEl.appendChild(iconEl);
      currentEl.appendChild(tempEl);
      currentEl.appendChild(humidityEl);
      currentEl.appendChild(windEl);
    });
}


function saveHistories() {
  //put the search word to array
  searchHistories.push(city);
  //save the updated search history to localstorage
  localStorage.setItem("searchHistories", JSON.stringify(searchHistories));
  // Get the existing history from local storage or create an empty array if there are no existing scores
  btnForLS = document.createElement("button");
  localStorageEl.appendChild(btnForLS);
  btnForLS.textContent = city;
  btnForLS.setAttribute("class", "cityHistory");
}

function storeStrage() {
  searchHistories = JSON.parse(localStorage.getItem("searchHistories")) || [];
  for (var i = 0; i < searchHistories.length; i++) {
    btnForLS = document.createElement("button");
    localStorageEl.appendChild(btnForLS);
    btnForLS.textContent = searchHistories[i];
    btnForLS.setAttribute("class", "cityHistory");
    btnForLS.addEventListener("click", function () {
      var city = this.textContent;
      getAPI(city);
    });
  }
}

btn.addEventListener("click", () => {
  console.log(document.querySelector(".search-input").value);
  city = searchInputEl.value.trim();
  getAPI(city);
});

storeStrage();
