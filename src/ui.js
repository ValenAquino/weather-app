export class UI {
    constructor() {
        this.temp = document.querySelector('.temp');
        
        this.location = document.querySelector('.city-name');
        this.cond = document.querySelector('.city-cond');
        this.time = document.querySelector('.city-time');
        this.date = document.querySelector('.city-date');
        
        this.cloudy = document.querySelector("#cloudy");
        this.humidity = document.querySelector("#humidity");
        this.wind = document.querySelector("#wind");
    }
    
    async render(weather) {
        let weather_data = await weather.fetchData();

        console.log(weather_data)

        if(weather_data == 404) {
            alert("Ubicación no encontrada");
        }
        else {
            this.location.textContent = weather.city;
            this.renderMainContent(weather_data);
            this.renderAside(weather_data);
        }
    }
    
    renderMainContent(weather_data) {
        let date = dateBuilder(weather_data.timezone);
        
        this.temp.textContent = Math.trunc(weather_data.main.temp) + '°';
        this.cond.textContent = weather_data.weather[0].main;
        this.time.textContent = `${date.hours}:${date.minutes}`;
        this.date.textContent = `${date.day}, ${date.month} ${date.date}`;
      }

      renderAside(weather_data) {
        this.humidity.textContent = weather_data.main.humidity;
        this.wind.textContent =  weather_data.wind.speed + ' m/s';
        this.cloudy.textContent = weather_data.clouds.all + '%';
      }
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