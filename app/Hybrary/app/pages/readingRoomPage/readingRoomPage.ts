import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/readingRoomPage/readingRoomPage.html'
})

export class ReadingRoomPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    constructor(nav, navParams){
        
    }
}