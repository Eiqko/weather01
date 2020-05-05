// const api = {
//     key: 'fe5db00a56eea07c4c5e1505058d55c7',
//     baseUrl: 'http://api.openweathermap.org/data/2.5/'
// }

//http://api.openweathermap.org/data/2.5/forecast?id=1642911&q=&mode=json&units=metric&cnt=5&appid=271da6b323b05ebaf2b4aaa0f3378f89

//All data base from API OW

const api = {
   key: "271da6b323b05ebaf2b4aaa0f3378f89",
   base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
   if (evt.keyCode == 13) {
    getResults(searchbox.value);
    getWeatherWeek(searchbox.value)
}
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(data=>{
        displayResults(data);
    }) 
    

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

let dif = document.querySelector('.dif');
dif.innerText = `Perbedaan: ${Math.round(weather.main.temp_max) - Math.round(weather.main.temp_min)}°c`
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

function getWeatherWeek(query) {
    //const urlForecast = `http://api.openweathermap.org/data/2.5/forecast?id=1642911&q=&mode=json&units=metric&cnt=5&appid=271da6b323b05ebaf2b4aaa0f3378f89`;
    const urlForecast = `${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`
    fetch(urlForecast)
      .then(response => response.json())
      .then(data =>  {forecastCelsius(data)})
  }


function forecastCelsius(data) {
let arrDate = [];
const arrayForecast = [1, 9, 17, 25, 33];


 arrayForecast.forEach(i => {
     let date = data.list[i].dt_txt
     .slice(5, 10)
     .split("-")
    .reverse()
    .join("/");
     arrDate.push(date);
 });
console.log(arrDate)

let x = 5

document.querySelector("#outPutForecast").innerHTML = `
        <div class="box">
        <h3>Temp</h3>
        <h3>Vibe</h3>
        <h3>Perbedaan</h3>
        </div>
        <div class="box" id="day-1">
        <h4>${arrDate[0]}</h4>
        <p>${(data.list[1].main.temp)}°C</p>
        <p>${(data.list[1].weather[0].description)}</p>
        <p>${Math.round((data.list[1].main.temp_max) - (data.list[1].main.temp_min)).toFixed(2)}°C</p>
        </div>
        <div class="box" id="day-2">
        <h4>${arrDate[1]}</h4>
        <p>${(data.list[9].main.temp)}°C</p>
        <p>${(data.list[9].weather[0].description)}</p>
        <p>${Math.round((data.list[9].main.temp_max) - (data.list[9].main.temp_min))}°C</p>
        </div>
        <div class="box" id="day-3">
        <h4>${arrDate[2]}</h4>
        <p>${(data.list[17].main.temp)}°C</p>
        <p>${(data.list[17].weather[0].description)}</p>
        <p>${Math.round((data.list[17].main.temp_max) - (data.list[17].main.temp_min))}°C</p>
        </div>
        <div class="box" id="day-4">
        <h4>${arrDate[3]}</h4>
        <p>${(data.list[25].main.temp)}°C</p>
        <p>${(data.list[25].weather[0].description)}</p>
        <p>${Math.round((data.list[25].main.temp_max) - (data.list[25].main.temp_min))}°C</p>
        </div>
        <div class="box" id="day-5">
        <h4>${arrDate[4]}</h4>
        <p>${(data.list[33].main.temp)}°C</p>
        <p>${(data.list[33].weather[0].description)}</p>
        <p>${Math.round((data.list[33].main.temp_max) - (data.list[33].main.temp_min))}°C</p>
        </div>
        <div class="box-end">
        <p>Average: </p>
        <p>${Math.round(((data.list[1].main.temp) + (data.list[9].main.temp)+ (data.list[17].main.temp)+ (data.list[25].main.temp)+ (data.list[33].main.temp)) / 5)}°C</p>
        <p>-</p>
        <p>-</p>
        </div>
        `;
}

