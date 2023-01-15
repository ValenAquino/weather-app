import style from './style.css'
import { Weather } from './weather';
import { UI } from './ui';

const submit_btn = document.querySelector("#submit-btn");
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

function handleRequest(city, country) {
    let weather = new Weather(city, country);
    ui.render(weather);
}

// IIFE
(()=>{
    handleRequest("Bernal", "Ar");
})();