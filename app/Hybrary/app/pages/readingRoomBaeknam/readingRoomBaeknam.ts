import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

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
}