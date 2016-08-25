import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/lockerPage/lockerPage.html'
})

export class LockerPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    // local variables
    nav: any;
    lockersInfo: any;

    constructor(nav, navParams){
        this.nav = nav;
        this.lockersInfo = navParams.get("lockersInfo");

        
    }

    alertOn(event){
        $("#alertButton").removeAttr("dark");
        $("#alertButton").addClass("redClass");

        $("#alertText").text("");
    }
}