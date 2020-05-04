// const api = {
//     key: 'fe5db00a56eea07c4c5e1505058d55c7',
//     baseUrl: 'http://api.openweathermap.org/data/2.5/'
// }

//http://api.openweathermap.org/data/2.5/forecast?id=1642911&q=&mode=json&units=metric&cnt=5&appid=271da6b323b05ebaf2b4aaa0f3378f89

const api = {
   key: "271da6b323b05ebaf2b4aaa0f3378f89",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
   if (evt.keyCode == 13) {
    getResults(searchbox.value);
}
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    console.log(weather)

let now = new Date();
let date = document.querySelector('.location .date');
date.innerText = dateBuilder(now);

let temp = document.querySelector('.current .temp');
temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

let suasana = document.querySelector('.current .weather');
suasana.innerText = weather.weather[0].main;

let high_low = document.querySelector('.hi-low');
high_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

let average = document.querySelector('.ave');
average.innerText = `Perbedaan: ${Math.round(weather.main.temp_max) - Math.round(weather.main.temp_min)}°c`
}


function dateBuilder (d) {
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}

