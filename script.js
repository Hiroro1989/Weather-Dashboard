var searchInputEl = document.querySelector(".search-input");
var searchResult = document.querySelector(".search-result");
var btn = document.querySelector(".search-button");
var localStorageEl = document.querySelector(".local-storage");
var currentEl = document.querySelector(".current");
var day1El = document.querySelector('.day-1');
var day2El =document.querySelector('.day-2');
var day3El =document.querySelector('.day-3');
var day4El = document.querySelector('.day-4');
var day5El = document.querySelector('.day-5');

var url;
var btnForLS;
var city;
var searchHistories = [];
//var weatherIdUrl = "https://openweathermap.org/img/wn/" + weatherId + "@2x.png";
var weatherId;

function getAPI(city) {
  //var url ='https://api.openweathermap.org/data/2.5/forecast/?q=Tokyo&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f'
  //var url = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + city + '&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f';
  url =
    "https://api.openweathermap.org/data/2.5/forecast/?q=" +
    city +
    "&appid=bd37527bc5df3c28cf62f2c192bc2e9f";

  fetch(url)
    .then(function (response) {
        if (response.status !== 200) {
            window.alert("City not found");
            currentEl.innerHTML = "";
            day1El.innerHTML = "";
            day2El.innerHTML = "";
            day3El.innerHTML = "";
            day4El.innerHTML = "";
            day5El.innerHTML = "";
          } else {
        return response.json();
      }
    })
    .then(function (data) {

      saveHistories();

      // create HTML elements for weather information
      var iconId = data.list[0].weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
      console.log(data.list[0].weather[0].icon);
      //7,15,23,31,39

      //current day
      var cityNameEl = document.createElement("h3");
      cityNameEl.textContent = city + ": " + dayjs().format("M/D/YYYY");

      var weatherDescEl = document.createElement("p");
      var iconEl = document.createElement("img");
      iconEl.setAttribute("src", iconUrl);
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
      

      //1day
      var dateEl = document.createElement("h4");
      dateEl.textContent =  dayjs().add(1, 'day').format('M/D/YYYY');
      var iconId = data.list[7].weather[0].icon;
      var iconEl1 = document.createElement("img");
      iconEl1.setAttribute("src", iconUrl);
      var tempEl1 = document.createElement("p");
      tempEl1.textContent =
        "Temperature: " +
        parseInt(((data.list[7].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";
        var humidityEl1 = document.createElement("p");
      humidityEl1.textContent = "Humidity: " + data.list[7].main.humidity + " %";

      var windEl1 = document.createElement("p");
      windEl1.textContent = "Wind Speed: " + data.list[7].wind.speed + "MPH";

      day1El.innerHTML = "";
      day1El.appendChild(dateEl);
      day1El.appendChild(iconEl1);
      day1El.appendChild(tempEl1);
      day1El.appendChild(humidityEl1);
      day1El.appendChild(windEl1);

      //2day
      var dateEl2 = document.createElement("h4");
      dateEl2.textContent =  dayjs().add(2, 'day').format('M/D/YYYY');
      var iconId = data.list[15].weather[0].icon;
      var iconEl2 = document.createElement("img");
      iconEl2.setAttribute("src", iconUrl);
      var tempEl2 = document.createElement("p");
      tempEl2.textContent =
        "Temperature: " +
        parseInt(((data.list[15].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";
        var humidityEl2 = document.createElement("p");
      humidityEl2.textContent = "Humidity: " + data.list[15].main.humidity + " %";

      var windEl2 = document.createElement("p");
      windEl2.textContent = "Wind Speed: " + data.list[15].wind.speed + "MPH";

      day2El.innerHTML = "";
      day2El.appendChild(dateEl2);
      day2El.appendChild(iconEl2);
      day2El.appendChild(tempEl2);
      day2El.appendChild(humidityEl2);
      day2El.appendChild(windEl2);

      //3day
      var dateEl3 = document.createElement("h4");
      dateEl3.textContent =  dayjs().add(3, 'day').format('M/D/YYYY');
      var iconId = data.list[23].weather[0].icon;
      var iconEl3 = document.createElement("img");
      iconEl3.setAttribute("src", iconUrl);
      var tempEl3 = document.createElement("p");
      tempEl3.textContent =
        "Temperature: " +
        parseInt(((data.list[23].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";
        var humidityEl3 = document.createElement("p");
      humidityEl3.textContent = "Humidity: " + data.list[23].main.humidity + " %";

      var windEl3 = document.createElement("p");
      windEl3.textContent = "Wind Speed: " + data.list[23].wind.speed + "MPH";

      day3El.innerHTML = "";
      day3El.appendChild(dateEl3);
      day3El.appendChild(iconEl3);
      day3El.appendChild(tempEl3);
      day3El.appendChild(humidityEl3);
      day3El.appendChild(windEl3);

      //4day
      var dateEl4 = document.createElement("h4");
      dateEl4.textContent =  dayjs().add(4, 'day').format('M/D/YYYY');
      var iconId = data.list[31].weather[0].icon;
      var iconEl4 = document.createElement("img");
      iconEl4.setAttribute("src", iconUrl);
      var tempEl4 = document.createElement("p");
      tempEl4.textContent =
        "Temperature: " +
        parseInt(((data.list[31].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";
        var humidityEl4 = document.createElement("p");
      humidityEl4.textContent = "Humidity: " + data.list[31].main.humidity + " %";

      var windEl4 = document.createElement("p");
      windEl4.textContent = "Wind Speed: " + data.list[31].wind.speed + "MPH";

      day4El.innerHTML = "";
      day4El.appendChild(dateEl4);
      day4El.appendChild(iconEl4);
      day4El.appendChild(tempEl4);
      day4El.appendChild(humidityEl4);
      day4El.appendChild(windEl4);

      //day5
      var dateEl5 = document.createElement("h4");
      dateEl5.textContent =  dayjs().add(5, 'day').format('M/D/YYYY');
      var iconId = data.list[39].weather[0].icon;
      var iconEl5 = document.createElement("img");
      iconEl5.setAttribute("src", iconUrl);
      var tempEl5 = document.createElement("p");
      tempEl5.textContent =
        "Temperature: " +
        parseInt(((data.list[39].main.temp - 273.15) * 9) / 5 + 32) +
        " °F";
        var humidityEl5 = document.createElement("p");
      humidityEl5.textContent = "Humidity: " + data.list[39].main.humidity + " %";

      var windEl5 = document.createElement("p");
      windEl5.textContent = "Wind Speed: " + data.list[39].wind.speed + "MPH";

      day5El.innerHTML = "";
      day5El.appendChild(dateEl5);
      day5El.appendChild(iconEl5);
      day5El.appendChild(tempEl5);
      day5El.appendChild(humidityEl5);
      day5El.appendChild(windEl5);
    })
    .catch(function(error){
        console.log(error.message);

    })
}

function saveHistories() {

    if (searchHistories.indexOf(city) !== -1) {
        return; // exit the function without saving
       }
       else if(city == null){
        return;
       }
      else
      {
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
