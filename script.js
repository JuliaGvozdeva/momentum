// DOM elements
const time = document.querySelector('.time'),
      greeting = document.querySelector('.greeting'),
      name = document.querySelector('.name'),
      focus = document.querySelector('.focus'),
      date = document.querySelector('.date')
      dayOfTime = document.querySelector('.timeOfDay'),
      changeBtn = document.querySelector('.changeImg'),
      weatherIcon = document.querySelector('.weather-icon'),
      temperature = document.querySelector('.temperature'),
      windSpeed = document.querySelector('.windSpeed'),
      humidity = document.querySelector('.humidity'),
      weatherDescription = document.querySelector('.weather-description'),
      city = document.querySelector('.city'),
      blockquote = document.querySelector('blockquote'),
      figcaption = document.querySelector('figcaption'),
      btn = document.querySelector('.btn');

// Variable
const img = document.createElement('img');
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const basePath = ['./assets/images/night/', './assets/images/morning/', './assets/images/afternoon/', './assets/images/evening/'];
const imageList = [];
let imgCounter =  0;
let numImg = 0;

// Set start image
function setStratImage() {
  let today = new Date(),
      hour = today.getHours();
  imgCounter = imageList.indexOf(imageList[hour]);
  img.src = imageList[imgCounter];
  img.onload = () => {      
    document.body.style.backgroundImage = "url(" + String(img.src) + ")";
  }
  if (imgCounter !== 23) {
    numImg = imgCounter + 1;
  }
}

// Show time, date, timeOfDay
function showTime() {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds(),
      day = today.getDay(),
      numberOfDay = today.getDate(),
      month = today.getMonth();
      dayOfTheWeek = getDayOfTheWeek(day);
      monthText = getOfMonth(month),
      timeOfDay = getTimeOfDay(hour);

  date.innerHTML = `${dayOfTheWeek}<span>,</span> ${numberOfDay} ${monthText}`;
  time.innerHTML = ` ${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  dayOfTime.innerHTML =  timeOfDay;

  setTimeout(showTime, 1000);
}

// Get the week of the day
function getDayOfTheWeek(day) {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekday[day];
}

// Get the month
function getOfMonth(monthEL) {
  const month = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return month[monthEL];
}

// Get the time of the day
function getTimeOfDay(hour) {
  if (hour >= 6 && hour <= 11) {
    return "Morning";
  } else if (hour >= 12 && hour <= 18) {
    return "Afternoon";
  } else if (hour >= 18 && hour <= 23) {
    return "Evening";
  } else {
    return "Night";
  }
};

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set backgrounds
function setBgGreet() {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds(),
      timeOfDay = getTimeOfDay(hour);

  if ((min == 0) && (sec == 0)) {
      imgCounter = imageList.indexOf(imageList[hour]);
      img.src = imageList[imgCounter];
      img.onload = () => {      
        document.body.style.backgroundImage = "url(" + String(img.src) + ")";
      }
  }

  // Set greeting
  if (timeOfDay === "Morning") {
    greeting.textContent = 'Good Morning,';
  } else if (timeOfDay === "Afternoon") {
    greeting.textContent = 'Good Afternoon,';
  } else if (timeOfDay === "Evening") {
    greeting.textContent = 'Good Evening,';
  } else {
    greeting.textContent = 'Good Night,';
    document.body.style.color = 'white';
  }
  setTimeout(setBgGreet, 60000);
}

// Generate list of images
function generateImages() {
  for (let i = 0; i < basePath.length; i++) {
    for (let j = 0; j < 6; j++) {
      imageList.push(basePath[i] + images[j]);
    }
  }
  return imageList;
}
 
// Get name
function getName() {
  if(localStorage.getItem('name') === null) {
    name.textContent = '[Enter name]';
  }
  else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  console.log("text-" + e.target.innerText + "-");
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim().length > 0 && e.target.innerText !== '') {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      } else {
        getName();
        name.blur();
      }
    }
  } else {
    if (e.target.innerText.trim().length > 0 && e.target.innerText !== '') {
      localStorage.setItem('name', e.target.innerText);
    } else {
      getName();
    }
  }
}

// Get focus
function getFocus() {
  if(localStorage.getItem('focus') === null || localStorage.getItem('focus') === " ") {
    focus.textContent = '[Enter focus]';
  }
  else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim().length > 0 && e.target.innerText !== ''){
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      } else {
        getFocus();
        focus.blur();
      }
    }
  } else {
    if (e.target.innerText.trim().length > 0 && e.target.innerText !== '') {
      localStorage.setItem('focus', e.target.innerText);
    } else {
      getFocus();
    }
  }
}

function changeImageByClick() {
  img.src = imageList[numImg];
  img.onload = () => {      
    document.body.style.backgroundImage = "url(" + String(img.src) + ")";
  }
  console.log(img.src);
  numImg === 23 ? numImg = 0 : numImg++;
}

// Set empty focus and name
function clearField(e) {
  if (e.target.className === 'focus') {
    focus.textContent = " ";
    focus.focus();
  } else if (e.target.className === 'name') {
    name.textContent = " ";
    name.focus();
  } else if (e.target.className === 'city') {
    city.textContent = " ";
    city.focus();
  }
}


// Set weather
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  if (city.innerText !== " " || city.innerText !== null){
    if (data.cod === "404") {
      weatherIcon.style.display = 'none';
      temperature.textContent = ``;
      windSpeed.textContent = ``;
      humidity.textContent = ``;
      weatherDescription.textContent = '';
      alert("Enter a correct city name!")
      city.textContent = '[Enter city]';
      localStorage.setItem('city', city.innerText);
    } else {
      weatherIcon.style.display = 'block';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherDescription.textContent = data.weather[0].description;
    }
  }
}

// Set city
function setCity(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (e.target.innerText.trim().length > 0 && e.target.innerText !== ''){
        localStorage.setItem('city', e.target.innerText);
        city.blur();
      } else {
        city.blur();
      }
    }
  } else {
    if (e.target.innerText.trim().length > 0 && e.target.innerText !== '') {
      localStorage.setItem('city', e.target.innerText);
      getWeather();
    } else {
      getCity();
    }
  }
}

// Get city
function getCity() {
  if(localStorage.getItem('city') === null || localStorage.getItem('city') === " ") {
    city.textContent = '[Enter city]';
  }
  else {
    city.textContent = localStorage.getItem('city');
  }

  if (city.textContent !== '[Enter city]') {
    getWeather();
  }
}

// Set quote
async function getQuote() {  
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json(); 
  
  if (data.quote.body.length > 500) {
    getQuote();
  } else {
    blockquote.textContent = data.quote.body; 
  }

  if (data.quote.author !== '') {
    figcaption.textContent = data.quote.author;
  } else {
    figcaption.textContent = "Unknown autor";
  }
  
}

// Listener events
name.addEventListener('click', clearField);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('click', clearField);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
changeBtn.addEventListener('click', changeImageByClick);
city.addEventListener('click', clearField);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
btn.addEventListener('click', getQuote);

// Run
generateImages();
getCity();
setStratImage();
showTime();
setBgGreet();
getName();
getFocus();
getQuote();