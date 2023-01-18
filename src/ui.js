import { handleRequest } from "./index.js";
class UI {
  constructor() {
    this.widget = new Widget();
    this.aside = new Aside();
    this.searchHandler = new SearchHandler();
  }

  render(weather_data) {
    if (weather_data == 404) {
      alert("Not found");
    } else {
      this.widget.render(weather_data);
      this.aside.render(weather_data);
      this.changeBackground(
        weather_data.weather[0].main,
        weather_data.timezone
      );
    }
  }

  addSearch(weather) {
    let btn = this.searchHandler.addSearch(weather);
    btn.addEventListener("click", (e) => {
      handleRequest(weather.city, weather.country);
    });
  }

  changeBackground(cond, timezone) {
    let body = document.querySelector("#body");
    let bg = "";

    if (isDay(dateBuilder(timezone).hours)) {
      bg += "day";
    } else {
      bg += "night";
    }

    if (cond.includes("Snow")) {
      bg += "-snowy";
    } else if (cond.includes("Clouds")) {
      bg += "-cloudy";
    } else if (cond.includes("Clear")) {
      bg += "-clear";
    } else if (cond.includes("Rain")) {
      bg += "-rainy";
    }

    body.classList = "";
    body.classList.add(bg);
  }
}

class Widget {
  constructor() {
    this.location = document.querySelector(".city-name");
    this.temp = document.querySelector(".temp");
    this.cond = document.querySelector(".city-cond");
    this.time = document.querySelector(".city-time");
    this.date = document.querySelector(".city-date");
    this.icon = document.querySelector("#icon-weather");
    this.url = "https://openweathermap.org/img/wn/";
  }

  renderDate(timezone) {
    let date = dateBuilder(timezone);
    this.time.textContent = `${date.hours}:${date.minutes}`;
    this.date.textContent = `${date.day}, ${date.month} ${date.date}`;
  }

  render(weather_data) {
    this.renderDate(weather_data.timezone);
    this.location.textContent = weather_data.name;
    this.temp.textContent = Math.trunc(weather_data.main.temp) + "°";
    this.cond.textContent = weather_data.weather[0].main;
    this.icon.setAttribute(
      "src",
      this.url + `${weather_data.weather[0].icon}@2x.png`
    );
  }
}

class Aside {
  constructor() {
    this.cloudy = document.querySelector("#cloudy");
    this.humidity = document.querySelector("#humidity");
    this.wind = document.querySelector("#wind");
  }

  render(weather_data) {
    this.humidity.textContent = weather_data.main.humidity;
    this.wind.textContent = weather_data.wind.speed + " m/s";
    this.cloudy.textContent = weather_data.clouds.all + "%";
  }
}

class SearchHandler {
  constructor() {
    this.fst_search = document.querySelector("#fst-search");
    this.snd_search = document.querySelector("#snd-search");
    this.trd_search = document.querySelector("#trd-search");
    this.turn = 0;
  }

  handleNewSearch(btn, search) {
    btn.classList.remove("display_none");
    btn.textContent = `${search.city}, ${search.country}`;
  }

  addSearch(search) {
    switch (this.turn) {
      case 0:
        this.handleNewSearch(this.fst_search, search);
        this.turn++;
        return this.fst_search;
      case 1:
        this.handleNewSearch(this.snd_search, search);
        this.turn++;
        return this.snd_search;
      case 2:
        this.handleNewSearch(this.trd_search, search);
        this.turn = 0;
        return this.trd_search;
    }
  }
}

/* ===== Utilities ===== */

function isDay(hour) {
  return hour <= 19 && hour >= 6;
}

function dateBuilder(timezone) {
  const nowInLocalTime = Date.now() + 1000 * (timezone / 3600);
  const millitime = new Date(nowInLocalTime);
  const lang = "en-US";

  let day2 = millitime.toLocaleString(lang, { weekday: "long" });
  let date = millitime.toLocaleString(lang, { day: "numeric" });
  let month2 = millitime.toLocaleString("en-US", { month: "long" });

  let day = day2.slice(0, 3);
  let month = month2.slice(0, 3);

  return {
    day,
    date,
    hours: millitime.getHours(),
    minutes: millitime.getMinutes(),
    month,
  };
}

export { UI, SearchHandler };
