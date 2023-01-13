const cityName = 'carlsbad'
const APIkey = 'ddb620661d0aaf562c78335649c76072'
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}&units=imperial`
const forecastContainer = document.querySelector('.forecastContainer')
const dayNamesForecast = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];

getData(API_URL)
async function getData(url){
    const res = await fetch(url)
    const data = await(res.json())
    diplayWeatherData(data)
}

function diplayWeatherData(data){
    const imgWeather = document.querySelector('.imgWeather');
    imgWeather.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    const descHolder = document.getElementById('desc')
    const desc = data.weather[0].description;
        words = desc.split(' ')
    let newDesc = words.map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
    }).join(" ");
    descHolder.innerHTML = newDesc
    const gradesFahrenheit = document.querySelector('#gradesFahrenheit')
    const humidityContainer = document.querySelector('#humidity')
    const temperature = data.main.temp
    const humidity = data.main.humidity
    gradesFahrenheit.textContent = temperature.toFixed()
    humidityContainer.textContent = humidity
}

const API_URL_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?&q=${cityName}&exclude=hourly&appid=ddb620661d0aaf562c78335649c76072&units=imperial`

forecastData(API_URL_FORECAST)
async function forecastData(url){
    const res = await fetch(url)
    const data = await(res.json())
    displayForecast(data)
}

function displayForecast(data) {
    const forecastTomorrow = dayNamesForecast[numberDay + 1]
    const forecastDayAfterTomorrow = dayNamesForecast[numberDay + 2]
    const forecastInTwoDays = dayNamesForecast[numberDay + 3]
    forecastContainer.innerHTML = `
    <table>
        <tr>
            <th>Next 3 days</th>
            <th>Temperature</th>
        </tr>
        <tr>
            <td>${forecastTomorrow}</td>
            <td>${data.list[8].main.temp.toFixed()}&#176;F</td>
        </tr>
        <tr>
            <td>${forecastDayAfterTomorrow}</td>
            <td>${data.list[16].main.temp.toFixed()}&#176;F</td>
        </tr>
        <tr>
            <td>${forecastInTwoDays}</td>
            <td>${data.list[24].main.temp.toFixed()}&#176;F</td>
        </tr>
    </table>
    `
}