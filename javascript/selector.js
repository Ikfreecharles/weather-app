//selectors from the top bar
let form = document.querySelector('form');
let currentLocation = document.querySelector('#location');

//selectors from main container
let overallOutercontainer = document.querySelector('.overall-outer-container');
let timeNow = document.querySelector('#time-now');
let theDayIcon = document.querySelector('.temperature-icon img');
let temperature = document.querySelector('.temperature-details h2');
let minTemperature = document.querySelector('#min');
let maxTemperature = document.querySelector('#max')
let feelsLike = document.querySelector('#feels-like');
let todaycondition = document.querySelector('#today-condition');
let dayDate = document.querySelector('.day-date');
let todayConditionIcon = document.querySelector('.today-condition-icon');
let gradFahrenheit = document.querySelector('.grad-fah');
let sunriseTime = document.querySelector('.sunrise p');
let sunsetTime = document.querySelector('.sunset p');
const moreWidget = document.querySelector('.more-widget');

//selectors from lower container
const hourlyWeatherCondition = document.querySelector('.hourly-weather-condition');
const dailyWeatherCondition = document.querySelector('.daily-weather-condition');
const today = document.querySelector('.today');
const sevenDays = document.querySelector('.seven-days');