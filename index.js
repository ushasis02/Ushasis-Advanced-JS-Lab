const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setEnterButton);

function setEnterButton(event){
    if(event.keyCode == 13){
        fetchResults(searchBox.value);
      }
  }


  function fetchResults(cityName){
    fetch(`${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(response => {
        console.log(response);
        displayResults(response);
    });
  }

  function displayResults(weather){
      let cityElement = document.querySelector('.location .city');
      cityElement.innerText = `${weather.name}, ${weather.sys.country}`;


      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = buildDate(now);

      let temprature = document.querySelector('.current .temp');
      temprature.innerHTML = `${Math.round(weather.main.temp)} <span> °c </span>`;

      let weatherInfo = document.querySelector('.current .weather');
      weatherInfo.innerText = weather.weather[0].main;

      let hi_low_temp = document.querySelector('.hi-low');
      hi_low_temp.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }

  function buildDate(currentDate){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[currentDate.getDay()];
    let date = currentDate.getDate();
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

