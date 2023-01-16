import { UI } from "./ui";

export let ui = new UI();

export class Storage {

    static restore_storage() {
        let storage = localStorage.getItem("latest");
        
        if(storage) {
            this.latest_searches = JSON.parse(storage);
            this.latest_searches.forEach(search => {ui.addSearch(search)});
            return true;
        }
        else {
            return false
        }
    }
    
    static save_storage(weather) {
        this.latest_searches.push(weather);
        localStorage.setItem("latest", JSON.stringify(this.latest_searches));
    }

}