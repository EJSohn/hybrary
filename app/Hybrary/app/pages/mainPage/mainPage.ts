import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/mainPage/mainPage.html'
})

export class MainPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    constructor(nav, navParams){
        
    }
}