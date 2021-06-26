let result;
let moreWidgetInner;
let hourlyOuter;
let dailyOuter;
//generic function to generate content
function generateContent(elementType, elementClass, appendTo, innerContent, setAttributeImg, setBackground, setAltAttribute){
    //create element
    let variableName = document.createElement(elementType);
    //add classes
    if(elementClass!=0){
        for (const iterator of elementClass) {
            variableName.classList.add(iterator);       
        }
    }
    //append as necessary
    if(appendTo) appendTo.append(variableName);
    //fill in with content from database
    if(innerContent) variableName.innerHTML = innerContent;
    //set src attribute on image tag
    if(setAttributeImg) variableName.setAttribute('src', setAttributeImg);
    //set background image if necessary
    if(setBackground) variableName.style.backgroundImage = `url(${setBackground})`;
    if(setAltAttribute) variableName.setAttribute('alt', setAltAttribute);

    //return variable created from the function
    return variableName;
}

//function to insert the correct icon
function correctIcon(element){
    if(element.weather[0].description === 'moderate rain')return "icons/SVG/Drizzle.svg"
    if(element.weather[0].description === 'overcast clouds')return "icons/SVG/Mostly Cloudy.svg"
    if(element.weather[0].description === 'light rain')return "icons/SVG/Rain.svg"
    if(element.weather[0].description === 'scattered clouds')return "icons/SVG/Hail.svg"
    if(element.weather[0].description === 'few clouds')return "icons/SVG/Party Cloudy.svg"
    if(element.weather[0].description === 'clear sky')return "icons/SVG/Mostly Sunny.svg"
    if(element.weather[0].description === 'broken clouds') return "icons/SVG/Fog.svg"
};

//function to convert the Unix time from the database to regular time
function convertUnixtime(time){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(time * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();

    // Will display time in 10:30 format
    return formattedTime = hours + ':' + minutes.substr(-2);
}

//function to convert the Unix date from the database to regular date
function convertUnixDate(time, format){
    if(format){
        return new Date(time*1000).toLocaleDateString('en-GB', {weekday:format});
    }else{
        return new Date(time*1000).toLocaleDateString('en-GB');
    }
}

//convert celcius to fahrenheit
function convertCelciusToFahrenheit(celcius){
return Math.floor((celcius * 9/5) + 32);
}

//--------------------------------------------------------------------------------------------------------

//function to convert search term(location) to longtitude and latitude
async function searchTermConvert(object){
    try {
        let searchTerm = object.elements.countrySearch.value;
        const response = await axios.get(`https://geocode.xyz/?locate=${searchTerm}&geoit=json`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//submit form and call the searchTermConvert function
form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let res = await searchTermConvert(form);
    console.log(res)
    //update location in html and reset form field
    currentLocation.innerHTML = res.standard.city+`${", "}`+res.standard.countryname;
    form.elements.countrySearch.value = '';
    //call all the functions to update data
    currentWeatherData(res);
    getHourlyData(res);
    getDailyData(res);
});
//calling the functions
currentWeatherData();
getHourlyData();
getDailyData();

//--------------------------------------------------------------------------------------------------------

//function to select child for current weather
function selectChildCurrentWeather(){
    window.setTimeout(() => {
        moreWidgetInner = document.querySelector('.more-widget-inner');
        console.log(moreWidgetInner);
    }, 1000);
}

//function to select child for hourly weather
function selectChildHourlyWeather(){
    window.setTimeout(() => {
        hourlyOuter = document.querySelector('.hourly-outer')
        console.log(hourlyOuter);
        horizontalScroll(hourlyOuter);
    }, 1000);
}

//function to select child for daily weather
function selectChildDailyWeather(){
    window.setTimeout(() => {
        dailyOuter = document.querySelector('.daily-outer')
        console.log(dailyOuter);
        horizontalScroll(dailyOuter);
    }, 1000);
}

//----------------------------------------------------------------------------------------------------------

//function to generate current weather condition
async function currentWeatherData(lonLat){
    try {
        if(lonLat){
            const report = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lonLat.latt}${"&"}lon=${lonLat.longt}&exclude=minutely,hourly,daily,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db`);
            let currentData = report.data.current;
            //call the method to display today's information
            if(moreWidget.hasChildNodes()){
                moreWidget.removeChild(moreWidgetInner);
                await moreWidgetData(currentData);
                selectChildCurrentWeather()
            }
            displaytodayTemp(currentData);
            return currentData;
        }else{
            const report = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=52.52437&lon=13.41053&exclude=minutely,hourly,daily,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db');
            let currentData = report.data.current;
            //call the method to display today's information
            displaytodayTemp(currentData);
            await moreWidgetData(currentData)
            selectChildCurrentWeather()
            return currentData;
        }
    } catch (error) {
        console.log(error);
    }
}

//function to generate hourly weather report
async function getHourlyData (lonLat){
    try {
        if(lonLat){
            const report = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lonLat.latt}${"&"}lon=${lonLat.longt}&exclude=current,minutely,daily,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db`);
            let hourlyData = report.data.hourly;
            //call the method to display today's information
            if(hourlyWeatherCondition.hasChildNodes()){
                hourlyWeatherCondition.removeChild(hourlyOuter);
                await hourlyWeather(hourlyData);
                selectChildHourlyWeather()
            }
            return hourlyData;
        }else{
            const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=52.52437&lon=13.410530&exclude=current,minutely,daily,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db');
            let hourlyData = response.data.hourly;
            await hourlyWeather(hourlyData);
            selectChildHourlyWeather()
            return hourlyData;
        }
      } catch (error) {
        console.error(error);
      }
};

//function to generate daily weather report
async function getDailyData (lonLat){
    try {
        if(lonLat){
            const report = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lonLat.latt}${"&"}lon=${lonLat.longt}&exclude=current,minutely,hourly,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db`);
            let dailyData = report.data.daily;
            //call the method to display today's information
            if(dailyWeatherCondition.hasChildNodes()){
                dailyWeatherCondition.removeChild(dailyOuter);
                await dailyWeather(dailyData);
                selectChildDailyWeather();
            }
            return dailyData;
        }else{
            const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=52.52437&lon=13.41053&exclude=current,minutely,hourly,alert&units=metric&appid=cfc32938072f4e1be66ba17e1b5296db');
            let dailyData = response.data.daily;
            //call the method to generate the content from the database into the div
            await dailyWeather(dailyData);
            selectChildDailyWeather();
            return dailyData;
        }
      } catch (error) {
        console.error(error);
      }
};

//--------------------------------------------------------------------------------------------------------

//function to generate content in the more widget column
function moreWidgetData(object){
    const innerMoreWidget = generateContent('div',['more-widget-inner'],moreWidget);
    const pNameContent = ['Humidity','UVI','Speed','Dew Point'];
    const pValueContent = [object.humidity, object.uvi, object.wind_speed, object.dew_point];
    const iconvalue = ['icons/SVG/Rain.svg', 'icons/SVG/Party Cloudy.svg', 'icons/SVG/Breezy.svg', 'icons/SVG/Snow.svg']
    let squareDiv, pName, pValue, icon;
    for (let index = 0; index <= 3; index++) {
        squareDiv = generateContent('div',['square','square-'+`${index}`],innerMoreWidget);
        pName = generateContent('p',[''],squareDiv,pNameContent[index]);
        pValue = generateContent('p',[''],squareDiv,pValueContent[index]);
        icon = generateContent('img',['widget-icon','icon-'+`${index}`],squareDiv,'',iconvalue[index]);
    }
    return innerMoreWidget;
}

//function to generate hourly divs, p, img and fill data
function hourlyWeather(object){
    const hourlyOutward = generateContent('div',['hourly-outer'],hourlyWeatherCondition);
    let dayDiv, timeDayDiv, pTime, weatherIconDiv, weatherIcon, temperatureDiv, pTemperature, dayConditionDiv, pCondition;
    for (const element of object) {
        dayDiv = generateContent('div',['hour'],hourlyOutward);
        timeDayDiv = generateContent('div',['time-day'],dayDiv);
        pTime = generateContent('p',[''],timeDayDiv,convertUnixtime(element.dt))
        weatherIconDiv = generateContent('div',['weather-icon'],dayDiv);
        weatherIcon = generateContent('img',[''],weatherIconDiv,'',correctIcon(element),'',element.weather[0].description);
        temperatureDiv = generateContent('div',['temperature'],dayDiv);
        pTemperature = generateContent('p',[''],temperatureDiv,element.temp+`${"&#8451"}`);
        dayConditionDiv = generateContent('div',['day-condition'],dayDiv);
        pCondition = generateContent('p',[''],dayConditionDiv,element.weather[0].description.toUpperCase());
    }
    return hourlyOutward;
}

//function to generate daily divs, p, img and fill data
function dailyWeather(object){
    const dailyOutward = generateContent('div',['daily-outer'],dailyWeatherCondition);
    let dayDiv, timeDayDiv, pTime, weatherIconDiv, weatherIcon, temperatureDiv, pTemperature, dayConditionDiv, pCondition;
    for (const element of object) {
        dayDiv = generateContent('div',['day'],dailyOutward);
        timeDayDiv = generateContent('div',['time-day'],dayDiv);
        pTime = generateContent('p',[''],timeDayDiv,convertUnixDate(element.dt, 'long'))
        weatherIconDiv = generateContent('div',['weather-icon'],dayDiv);
        weatherIcon = generateContent('img',[''],weatherIconDiv,'',correctIcon(element),'',element.weather[0].description);
        temperatureDiv = generateContent('div',['temperature'],dayDiv);

        let minMaxTemp = `${'<i class="bi bi-arrow-down low"></i>'}`+element.temp.min+`${"&#8451"}`+`${"/"}`+`${'<i class="bi bi-arrow-up high"></i>'}`+element.temp.max+`${"&#8451"}`;

        pTemperature = generateContent('p',[''],temperatureDiv,minMaxTemp);
        dayConditionDiv = generateContent('div',['day-condition'],dayDiv);
        pCondition = generateContent('p',[''],dayConditionDiv,element.weather[0].description.toUpperCase());
    }
    return dailyOutward;
}

function displaytodayTemp(object){
    let today = new Date().toLocaleDateString('en-GB');
    let dbDate = convertUnixDate(object.dt);

    if(today == dbDate){
        let temp = object.temp+`${"&#8451"}`
        let tempFeelsLike = object.feels_like+`${"&#8451"}`;
        let currentCondition = object.weather[0].main;
        let sunrise = `${"Sunrise: "}`+convertUnixtime(object.sunrise);
        let sunset = `${"Sunset: "}`+convertUnixtime(object.sunset);
        temperature.innerHTML = temp;
        feelsLike.innerHTML = tempFeelsLike;
        todaycondition.innerHTML = currentCondition;
        todayConditionIcon.setAttribute('src', correctIcon(object));
        gradFahrenheit.innerHTML = temp+`${"/"}`+convertCelciusToFahrenheit(object.temp)+`${"&#8457"}`;
        sunriseTime.innerHTML = sunrise;
        sunsetTime.innerHTML = sunset;
    }
}

//------------------------------------------------------------------------------------------------------------