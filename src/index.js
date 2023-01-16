import style from './style.css'
import { Weather } from './weather';
import { UI } from './ui';

const submit_btn = document.querySelector("#submit-btn");
const search_btns = document.querySelectorAll(".search-btn");
const ui = new UI();
let latest_searches = [];

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

search_btns.forEach(search_btn => {
    search_btn.addEventListener("click", (e) => {
        ui.render
    });
})

function restore_storage() {
    let storage = localStorage.getItem("latest");
    
    if(storage) {
        ui.load_latest_searches(storage)   
    }
}

function save_storage(weather) {
    latest_searches.push(weather);
    localStorage.setItem("latest", JSON.stringify(latest_searches));
}

function handleRequest(city, country) {
    let weather = new Weather(city, country);
    ui.render(weather);
    save_storage(weather);
}

// IIFE
(()=>{
    handleRequest("Bernal", "Ar");
})();