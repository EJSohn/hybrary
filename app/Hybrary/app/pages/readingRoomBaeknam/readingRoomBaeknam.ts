import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

// import static
import {urlInfo} from "../../static/baekNamUrl";

// import component
import {IframePage} from "../iframePage/iframe";

@Component({
    templateUrl: 'build/pages/readingRoomBaeknam/readingRoomBaeknam.html'
})

export class BaeknamPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables
    nav: any;
    seats: any;

    constructor(nav, navParams){
        this.nav = nav;
        this.seats = navParams.get("baeknamInfo");
        // get lockers Info

        console.log(this.seats);
    }

    showSeats(event, RRname, id){
        // show iframe
        console.log(RRname);
        console.log(urlInfo);
        // find url that iframe will show
        var showSrc = urlInfo[id];
        this.nav.push(IframePage, {
            showSrc: showSrc,
            RRname: RRname,
            id: id
        });
    }
}