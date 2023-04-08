var searchInputEl = document.querySelector('.search-input')
var searchResult = document.querySelector('.search-result')
var btn = document.querySelector('.search-button')
var localStorageEl = document.querySelector('.local-storage')
var btnForLS = document.createElement("button");
var city;




function getAPI(city){
    //var url ='https://api.openweathermap.org/data/2.5/forecast/?q=Tokyo&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f'
var url = 'https://api.openweathermap.org/data/2.5/forecast/?q=' + city + '&cnt=5&appid=bd37527bc5df3c28cf62f2c192bc2e9f';

fetch(url)
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    console.log(typeof data)
    console.log("weather: " + data.list[0].weather[0].main); //weather(clear cloud, rain)
    console.log("temp: " + data.list[0].main.temp) //temp
    console.log("humidity: "+ data.list[0].main.humidity)
    console.log("wind: "+ data.list[0].wind.speed)
  

})
}
//getAPI();

btn.addEventListener('click', () =>{
    
    console.log(document.querySelector('.search-input').value)
    city = searchInputEl.value.trim();
    getAPI(city);
    saveHistories();
})

var searchHistories = [];

function saveHistories(){
    //create btn for searh history
    localStorageEl.appendChild(btnForLS);
    btnForLS.textContent = city;
    //put the search word to array
    searchHistories.push(city);
    //save the updated search history to localstorage
    localStorage.setItem("searchHistories", JSON.stringify(searchHistories))
}