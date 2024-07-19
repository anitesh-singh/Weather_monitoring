//API configuration(sets api key and base url)
const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

//selects the search box element and adds an event listener for the keypress which triggers setquery
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

//check if enter key(keycode 13 is pressed so that it can call getResult)
function setQuery(evt) {
  if (evt.keyCode === 13) {
    clearPreviousResults();  //it now clear previous resuts or errors, previously when error comes we can't search again without refreshing the page so this fuctions clears every searches prior going to another search
    getResults(searchbox.value);
  }
}

//fetches weather data from openweatherapp api for given query(city name). it constructs url with the city name, units in metric and the api key, after fetching it converts response to json and call display result
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {               //if wrong city name is entered api returns an error,
      if (!weather.ok) {               //checking for the error and displaying the message
        throw new Error('No such city/country');
      }
      return weather.json();
    })
    .then(displayResults)
    .catch(error => {
      displayError(error.message);
    });
}

//it updates the city and country name, shows current date, temperature, high and low temp
function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

//it displays the error message if the wrong city and country name is entered as api gives an error when wrong name is given
function displayError(message) {
  let city = document.querySelector('.location .city');
  city.innerText = message;

  let date = document.querySelector('.location .date');
  date.innerText = '';

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = '';

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = '';

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = '';
}

//it clear previous searches and error messages so that we can search again without refreshing the page
function clearPreviousResults() {
  let city = document.querySelector('.location .city');
  city.innerText = '';

  let date = document.querySelector('.location .date');
  date.innerText = '';

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = '';

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = '';

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = '';
}

//this function formats the current date into a readable string 
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


//old one only for fetching coutry name and presenting it
// function getResults(query) {
//   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(weather => {
//       return weather.json();
//     }).then(displayResults);
// }