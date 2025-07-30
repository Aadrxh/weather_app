import { fetchWeatherData, processedWeatherData, fetchGifForCondition } from "./weather.js";
import "./style.css";


const form=document.getElementById("Weather-form");
const input=document.getElementById("location-input");
const loading=document.getElementById("loading");
const result=document.getElementById("weather-result");

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const location=input.value;
    if(!location) return;

    result.classList.add("hidden");
    loading.classList.remove("hidden");

    const rawdata=await fetchWeatherData(location);
    const weather=processedWeatherData(rawdata);

    loading.classList.add("hidden");
    displayWeather(weather);



})
 async function displayWeather(weather) {
  if (!weather) {
    result.innerHTML = "<p>Weather not found.</p>";
    return;
  }

  const gifUrl = await fetchGifForCondition(weather.description);

    result.innerHTML = `
    <div class="weather-wrapper">
        <div class="weather-content">
        <h2>${weather.location}</h2>
        <p>${weather.description}</p>
        <p><strong>${weather.temp}</strong></p>
        <img src="${weather.icon}" alt="${weather.description}" />
        </div>
        ${gifUrl ? `<div class="weather-gif"><img src="${gifUrl}" alt="${weather.description} GIF" /></div>` : ""}
    </div>
    `;


  result.classList.remove("hidden");
}