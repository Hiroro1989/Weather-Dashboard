var searchInputEl = document.querySelector('.search-input')
var searchResult = document.querySelector('.search-result')
var btn = document.querySelector('.search-button')
var localStorageEl = document.querySelector('.local-storage')
var btnForLS;
var city;
var searchHistories = [];

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

function saveHistories(){
    //put the search word to array
    searchHistories.push(city);
    //save the updated search history to localstorage
    localStorage.setItem("searchHistories", JSON.stringify(searchHistories))
  // Get the existing history from local storage or create an empty array if there are no existing scores
  btnForLS = document.createElement("button");
  localStorageEl.appendChild(btnForLS);
  btnForLS.textContent = city;
}

function storeStrage(){
    searchHistories = JSON.parse(localStorage.getItem("searchHistories")) || [];
    for(var i = 0; i < searchHistories.length; i++){
        btnForLS = document.createElement("button");
        localStorageEl.appendChild(btnForLS);
        btnForLS.textContent = searchHistories[i];
        }
    }

btn.addEventListener('click', () =>{
    
    console.log(document.querySelector('.search-input').value)
    city = searchInputEl.value.trim();
    getAPI(city);
    saveHistories();
})

storeStrage();

// function searchFromHistory(){
//     searchInputEl.textContent = btnForLS.textContent;
// }

// btnForLS.addEventListener('click', ()=>{

//     console.log(btnForLS)
//     searchFromHistory();
// }
// )


