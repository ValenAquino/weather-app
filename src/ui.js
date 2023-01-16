export class UI {
    constructor() {
        // main widget
        this.location = document.querySelector('.city-name');
        this.temp = document.querySelector('.temp');
        this.cond = document.querySelector('.city-cond');
        this.time = document.querySelector('.city-time');
        this.date = document.querySelector('.city-date');
        this.icon = document.querySelector('#icon-weather');
        
        // aside info
        this.cloudy = document.querySelector("#cloudy");
        this.humidity = document.querySelector("#humidity");
        this.wind = document.querySelector("#wind");

        // aside latest searches
        this.fst_search = document.querySelector("#fst-search");
        this.snd_search = document.querySelector("#snd-search");
        this.trd_search = document.querySelector("#trd-search");
        this.turn = 0;
    }
    
    async render(weather) {
        let weather_data = await weather.fetchCurrentData();
        let forecast_data = await weather.fetch5DaysData();

        // console.log(forecast_data);

        if(weather_data == 404) {
            alert("Ubicación no encontrada");
        }
        else {
            this.location.textContent = capitalizeFirstLetter(weather.city);
            this.renderMainContent(weather_data);
            this.renderAside(weather_data);
            this.addSearch(weather);
        }
    }
    
    renderMainContent(weather_data) {
        let date = dateBuilder(weather_data.timezone);
        
        this.temp.textContent = Math.trunc(weather_data.main.temp) + '°';
        this.cond.textContent = weather_data.weather[0].main;
        this.time.textContent = `${date.hours}:${date.minutes}`;
        this.date.textContent = `${date.day}, ${date.month} ${date.date}`;
        this.icon.setAttribute(
            "src", `https://openweathermap.org/img/wn/${weather_data.weather[0].icon}@2x.png`);
      }

    renderAside(weather_data) {
        this.humidity.textContent = weather_data.main.humidity;
        this.wind.textContent =  weather_data.wind.speed + ' m/s';
        this.cloudy.textContent = weather_data.clouds.all + '%';
    }

    handleNewSearch(btn, search) {
        btn.classList.remove("display_none");
        btn.textContent = `${search.city}, ${search.country}`;
        btn.addEventListener('click', () => this.render(search));
    }

    addSearch(search) {
        switch(this.turn) {
            case 0: 
                this.handleNewSearch(this.fst_search, search);
                this.turn++;
                break;
            case 1: 
                this.handleNewSearch(this.snd_search, search);
                this.turn++;
                break;
            case 2: 
                this.handleNewSearch(this.trd_search, search);
                this.turn = 0;
                break;
        }
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function dateBuilder(timezone) {
    const nowInLocalTime = Date.now()  + 1000 * (timezone / 3600);
    const millitime = new Date(nowInLocalTime);
    const lang = "en-US";

    let day2 = millitime.toLocaleString(lang, {weekday: "long"}); 
    let date = millitime.toLocaleString(lang, {day: "numeric"});
    let month2 = millitime.toLocaleString("en-US", {month: "long"});

    let day = day2.slice(0, 3);
    let month = month2.slice(0,3);

    return {
        day,
        date,
        hours: millitime.getHours(),
        minutes: millitime.getMinutes(),
        month
    }
}