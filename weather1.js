//tab-handilling

const userTab = document.querySelector("[data-userweather]");
const searchTab = document.querySelector("[data-search-weather]");
const userContainer = document.querySelector(".weather-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const SearchFrom = document.querySelector("[data-searchform]");
const SearchInp = document.querySelector("[data-searchinp]");
const apiErrorContainer = document.querySelector(".api-error-container");

let currentTab = userTab;

const API_KEY="b9b862028eadb36697defe9154f515bf";

currentTab.classList.add('current-tab');

function switchTab(clickedTab){
apiErrorContainer.classList.remove("active");
if (clickedTab !==currentTab) {
currentTab.classList.remove("current-tab");
currentTab=clickedTab;
currentTab.classList.add("current-tab");


if(!SearchFrom.classList.contains("active")){
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    SearchFrom.classList.add("active");

}else{
    SearchFrom.classList.remove("active");
    userInfoContainer.classList.remove("active");
    getFromSessionStorage()
}
}
}
userTab.addEventListener("click", ()=>{
    switchTab(userTab);
})
searchTab.addEventListener("click", ()=>{
switchTab(searchTab);
})
//user weather handilling

const grantAccessBtn = document.querySelector("[data-GrantAccess]");
const messagetext = document.querySelector("[data-messageTest]");
const loadingscreen = document.querySelector(".loading-container");
const apiErrorimg = document.querySelector("[data-notfoundingImg]");
const apiErrorMessage = document.querySelector("[data-api-Error-Text]");
const apiErrorBtn = document.querySelector("[data-apiError-btn]");

function getFromSessionStorage(){
const localCoordinates = sessionStorage.getItem("user-coordinates");
if(!localCoordinates){
grantAccessContainer.classList.add("active");
}else{
const coordinates = JSON.parse(localCoordinates);

}
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
    grantAccessBtn.style.display= "none";
    messagetext.innerHTML="Geolocation is not supported by this browser";
    }
  }
  
  function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

sessionStorage.setItem("user-coordinates",JSON.stringify
    (userCoordinates));
fectchUserWeatherInfo(userCoordinates);
  }

//handilling error

function showError(error){
switch(error.code){
case error.PERMISSION_DENIED:
messageText.innerText = "you denied the request for geolocation";
break;
case error.POSITION_UNAVAILABLE:
messageText.innerText = "location information not availble";  
break;
case error.TIMEOUT:
case error.POSITION_UNAVAILABLE:
messageText.innerText = "the request to get user timed out";
break;
case error.UNKNOWN_ERROR:
messageText.innerText = "unknown error";
break;       
}
}
getFromSessionStorage();
grantAccessBtn.addEventListener("click",getLocation);

async function fectchUserWeatherInfo(coordinates){
const {lat,lon} = coordinates;

grantAccessContainer.classList.remove("active");
loadingscreen.classList.add("active");

 try{
const res = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
const data = await res.json();
console.log(data);
if (!data.sys) {
  throw data;
}
loadingscreen.classList.remove("active");
loadingscreen.classList.add("active");
renderWeatherinfo(data);

} catch (error) {
  loadingscreen.classList.remove("active");
  apiErrorContainer.classList.add("active");
  apiErrorimg.style.display = "none";
  apiErrorMessage.innerText = `Error ${error?.message}`;
  apiErrorBtn.addEventListener("click",fectchUserWeatherInfo);

}
}

 function renderWeatherinfo(weatherinfo){
  const cityName = document.querySelector("[data-cityName]");
  const countryIcon = document.querySelector("[data-contryIcon]");
  const desc = document.querySelector("[data-weatherDesc]");
  const weatherIcon = document.querySelector("[data-weatherIcon]");
  const temp = document.querySelector("[data-temp]");
  const windspeed = document.querySelector("[data-windspeed]");
  const humidity = document.querySelector("[data-humidity]");
  const cloudiness = document.querySelector("[data-cloudliness]");

  cityName.innerText = weatherinfo?.name;
  countryIcon.src = `https://flagcdn.com/144*108${weatherinfo?.sys.country.toLowerCase()}.png`;
  desc.innerText = weatherInfo?.[0]?.main;
  weatherIcon.src = `https://openweathermap.org/img/${weatherinfo?.weather?.[0].icon}.png`;

  temp.innerText = `${weatherinfo?.main?.temp.toFixed(2)} °C`;
  windspeed.innerText = `${weatherinfo?.wind?.speed.toFixed(2)}m/s`;
  humidity.innerText = `${weatherinfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherinfo?.clouds?.all}%`;

}

//search weather info

searchFrom.addEventListener("submit",(e)=>{
e.preventDefault();

if(SearchInp.value === "") return;
fectchUserWeatherInfo(SearchInp.value);
SearchInp.value= "";
});

async function fectchUserWeatherInfo(city){
  loadingscreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  apiErrorContainer.classList.remove("active");

  try{
const res = await fectch(
  `https://api.openweathermap.org/data/2.5/weather?q=&{city},uk&appid=${API_KEY}`
);
const data = await res.json();
if(!data.sys){
  throw data;
}
loadingscreen.classList.remove("active");
userInfoContainer.classList.add("active");
renderWeatherinfo(data);
  }catch(error){
    loadingscreen.classList.remove("active");
    apiErrorContainer.classList.add("active");
    apiErrorMessage.innerText =`${error?.message}`;
    apiErrorBtn.style.display = "none";
  }
}








