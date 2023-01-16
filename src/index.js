import style from './style.css'

import { UI } from './ui';
import { Weather } from './weather';
import { Storage } from './storage';

const submit_btn = document.querySelector("#submit-btn");
let latest_searches = [];
const ui = new UI();


submit_btn.addEventListener("click", (e) => {
    const city = document.querySelector("#city-input").value;
    const country = document.querySelector("#country-input").value;
    const form = document.querySelector(".location-form");
    
    if(city.length == 0 || country.length == 0)
    alert("Debes completar los campos");
    else
    handleRequest(city, country);
    
    e.preventDefault();
    form.reset();
});

export async function handleRequest(city, country) {
    let weather = new Weather(city, country);
    let weather_data = await weather.fetchCurrentData();
    let forecast_data = await weather.fetch5DaysData();
    
    console.log(forecast_data);

    ui.render(weather_data);
    ui.addSearch(weather);
}

// IIFE
(()=>{
    if(!Storage.restore_storage())
        handleRequest("Bernal", "Ar");
})();