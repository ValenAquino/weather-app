export class Weather {
    constructor(city, country) {
        this.apiKey = '2aef1cdc722f7b0ad237c469efb33d2a';
        this.city = city;
        this.country = country;
    }

    async fetchData() {
        let URL  = "https://api.openweathermap.org/data/2.5/weather";
        let REQ  = `?q=${this.city},${this.country}&appid=${this.apiKey}&units=metric`;
        let res  = await fetch(URL + REQ);
        let data = await res.json();

        if(data.cod != 404) {
            return data;
        }
        else {
            return data.cod;
        }
    }
}