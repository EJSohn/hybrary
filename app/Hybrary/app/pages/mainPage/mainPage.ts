import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

// import components
import {LockerPage} from '../lockerPage/lockerPage';
import {ReadingRoomPage} from '../readingRoomPage/readingRoomPage';

@Component({
    templateUrl: 'build/pages/mainPage/mainPage.html'
})

export class MainPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables.
    nav: any;

    constructor(nav, navParams){
        this.nav = nav;
    }

    moveLockerPage(event){
        // move to locker page.
        this.nav.push(LockerPage);
    }

    moveReadingRoomPage(event){
        // move to reading room page.
        this.nav.push(ReadingRoomPage);
    }

}