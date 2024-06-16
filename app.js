const inputBox = document.querySelector("#inp-box");
const searchBtn = document.querySelector("#searchBtn");
const weather_img = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const discription = document.querySelector(".discription");
const humidity = document.querySelector("#humidity");``
const wind_Speed = document.querySelector("#windSpeed");


 async function checkWeather(city) {
  const api_Key = "45f5ee1f6bd3fb2229b687e811a1475a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_Key}`;

  const weather_data = await fetch(`${url}`).then(response => response.json());

//   location not found or invalid location
    if(weather_data.cod === `404`){
        document.querySelector('.location-not-found').style.display = "flex" ;
        document.querySelector('.weather-body').style.display = "none" ;
        document.querySelector('.no-location').style.display = 'none' ;
        console.log("error");
        return;
     }
    else{    
        document.querySelector('.weather-body').style.display = "flex" ;
        document.querySelector('.location-not-found').style.display = "none" ;
    }

    // when user does not enter any location or leaves input box empty
    if(weather_data.cod === `400` || weather_data.cod === ``){
        document.querySelector('.no-location').style.display = 'flex' ;
        document.querySelector('.location-not-found').style.display = "none" ;
        document.querySelector('.weather-body').style.display = "none" ;
    }else{
        document.querySelector('.no-location').style.display = 'none' ;
    }

    // when everything is perfect (user enters a valid location)
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    discription.innerHTML = `${weather_data.weather[0].main}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`
    wind_Speed.innerHTML = `${weather_data.wind.speed}Km/h`

    // selection of images on the basis of weather
    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "./images/cloud.png" ; 
            break;
        case 'Clear':
            weather_img.src = "./images/clear.png" ; 
            break;
        case 'Mist':
            weather_img.src = "./images/mist.png" ; 
            break;
        case 'Rain':
            weather_img.src = "./images/rain.png" ; 
            break;
        case 'Haze':
            weather_img.src = "./images/haze.png" ; 
            break;
        case 'Snow':
            weather_img.src = "./images/snow.png" ; 
            break;
        default:
            break;
    }
}
// button listenes the event when clicked, and display the information about the city entered
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
  
});


