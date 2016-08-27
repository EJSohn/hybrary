import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert ,Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/iframePage/iframe.html'
})

export class IframePage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables
    nav: any;
    Src: any;
    RRname: any;

    constructor(nav, navParams){
        this.nav = nav;
        this.Src = navParams.get('showSrc');
        this.RRname = navParams.get('RRname');

        console.log(this.Src);
    }
}