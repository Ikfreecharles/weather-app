let timer = getCurrentTime()
setInterval(theTimeNow, 1000);

//event listener to control and toggle classes on the today, tomorrow and 7 days tab
today.addEventListener('click', (e)=>{
    e.preventDefault();
    today.classList.add('active');
    sevenDays.classList.remove('active');
    hourlyWeatherCondition.classList.add('show')
    dailyWeatherCondition.classList.remove('show');
    hourlyWeatherCondition.style.pointerEvents = 'all'
});
sevenDays.addEventListener('click', (e)=>{
    e.preventDefault();
    sevenDays.classList.add('active');
    today.classList.remove('active');
    dailyWeatherCondition.classList.add('show')
    hourlyWeatherCondition.classList.remove('show');
    hourlyWeatherCondition.removeAttribute('id');
    hourlyWeatherCondition.style.pointerEvents = 'none';
});

//change the body background depending on the time of the day
if(timer > 5 && timer < 19){
    overallOutercontainer.style.backgroundImage = "linear-gradient(rgba(115, 140, 181, 0.2), rgba(115, 140, 181, 0.7)), url('/image/chandan-chaurasia-wCYuhCA4T9k-unsplash.jpg')";
    theDayIcon.setAttribute('src', 'icons/SVG/Mostly Sunny.svg')
}else{
    overallOutercontainer.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/craig-ren-VahBt4eoPQI-unsplash.jpg')";
    theDayIcon.setAttribute('src', 'icons/SVG/Clear Night.svg')
}

//function to get the current hour to change the background as necessary
function getCurrentTime(){
    return new Date().getHours();
}

//function to get the time now and run it every second to get the current time on the screen
function theTimeNow(){
    let date = new Date();
    timeNow.innerHTML = date.toLocaleTimeString();
    dayDate.innerHTML = date;
}

//drag and drop horizontal scroll funtion of overflow---------------------------------------------
function horizontalScroll(theElement){
    let isDown = false;
    let startX;
    let scrollLeft;

    theElement.addEventListener('mousedown', (e)=>{
        isDown = true;
        startX = e.pageX - theElement.offsetLeft;
        scrollLeft = theElement.scrollLeft;
    })
    theElement.addEventListener('mouseleave', ()=>{
        isDown = false;
    })
    theElement.addEventListener('mouseup', ()=>{
        isDown = false
    })
    theElement.addEventListener('mousemove', (e)=>{
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - theElement.offsetLeft;
        const walk = x - startX;
        theElement.scrollLeft = scrollLeft - walk;
    })
}