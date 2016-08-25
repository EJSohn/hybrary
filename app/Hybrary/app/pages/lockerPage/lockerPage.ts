import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/lockerPage/lockerPage.html'
})

export class LockerPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }

    constructor(nav, navParams){
        
    }

    alertOn(event){
        $("#alertButton").removeAttr("dark");
        $("#alertButton").addClass("redClass");

        $("#alertText").text("");
    }
}