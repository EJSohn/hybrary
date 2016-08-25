import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/readingRoomBaeknamPage/readingRoomBaeknamPage.html'
})

export class BaeknamPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables
    nav: any;
    
    constructor(nav, navParams){
        this.nav = nav;

        // get lockers Info

    }
}