import { SearchHandler } from "./ui";

export let searchHandler = new SearchHandler();

export class Storage {

    static restore_storage() {
        let storage = localStorage.getItem("latest");
        
        if(storage) {
            this.latest_searches = JSON.parse(storage);
            this.latest_searches.forEach(search => {searchHandler.addSearch(search)});
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