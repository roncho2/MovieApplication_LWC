import { LightningElement } from 'lwc';
const DELAY = 300;

export default class MovieSearch extends LightningElement {

    selectedType = "";
    selectedSearch = "";
    loading = false;
    searchResult = [];
    selectedPageNo = "1";
    delayTimeout;

    get typeoptions() {
        return [
            { label: "None", value: "" },
            { label: "Movie", value: "movie" },
            { label: "Series", value: "series" },
            { label: "Episode", value: "episode" },
        ];
    }

    handleChange(event){
        let {name, value} = event.target;
        this.loading = true;
        if(name === "type"){
            this.selectedType = value;
        }else if(name === "search" ){
            this.selectedSearch = value;
            
        }else if(name === "pageno"){
            this.selectedPageNo = value;
        }
        //Debouncing
        clearTimeout(this.delayTimeout);
       this.delayTimeout = setTimeout(()=>{ 
        this.searchMovie();
       },DELAY);
        
    }
    //This method will search for the movie/series/episode
    async searchMovie(){
    //const URL = http://www.omdbapi.com/?s=${enteredValue}&type=${this.selectedType}&page=${this.pageNumber}&apikey=f6762bfe
    const url = `http://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${selectedPageNo}&apikey=fa72720b`;
    const res = await fetch(url);
    const data = await res.json();
    JSON.stringify(data);
    this.loading = false;
    if(data.SUCCESS === true){
        this.searchResult = data.Search;
    }

    }
}