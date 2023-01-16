export class Weather {
    constructor(city, country) {
        this.apiKey = '2aef1cdc722f7b0ad237c469efb33d2a';
        this.url = "https://api.openweathermap.org/data/2.5/";
        this.city = city;
        this.country = country;
    }

    getCurrentWeather() {
        return `weather?q=${this.city},${this.country}&appid=${this.apiKey}&units=metric`;
    }

    getForecast() {
        return `forecast?q=${this.city},${this.country}&appid=${this.apiKey}&units=metric`;
    }

    async fetchData(req) {
        let res  = await fetch(this.url + req);
        let data = await res.json();

        if(data.cod != 404) {
            return data;
        }
        else {

            return data.cod;
        }
    }

    async fetchCurrentData() {
        let req = this.getCurrentWeather();
        let data = await this.fetchData(req);

        return data;
    }

    async fetch5DaysData() {
        let req = this.getForecast();
        let data = await this.fetchData(req);
        return data;
    }
}