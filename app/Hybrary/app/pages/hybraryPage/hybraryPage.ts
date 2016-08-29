import {NavController, NavParams, Storage, LocalStorage, SqlStorage} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/hybraryPage/hybraryPage.html'
})

export class HybraryPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables
    nav: any;

    constructor(nav, navParams, sanitizer){
        this.nav = nav;
    }
}