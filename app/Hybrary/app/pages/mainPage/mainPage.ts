import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController, MenuController} from 'ionic-angular';
import {Component} from "@angular/core";
import { SMS } from 'ionic-native';

// import components
import {LockerPage} from '../lockerPage/lockerPage';
import {ReadingRoomPage} from '../readingRoomPage/readingRoomPage';
import {LawPage} from '../readingRoomLaw/readingRoomLaw';
import {BaeknamPage} from "../readingRoomBaeknam/readingRoomBaeknam";
import {HybraryPage} from "../hybraryPage/hybraryPage";
import {DeveloperPage} from "../developerPage/developerPage";

@Component({
    templateUrl: 'build/pages/mainPage/mainPage.html'
})

export class MainPage {
    static get parameters(){
        return [[NavController], [NavParams], [LoadingController], [AlertController], [MenuController]]
    }

    // local variables.
    nav: any;
    lockersInfo: any;
    loadingCtrl: any;
    alertCtrl: any;
    menuCtrl: any;
    baeknamInfo: any;
    lawInfo: any;

    constructor(nav, navParams, loadingCtrl, alertCtrl, menuCtrl){
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
    }

    moveToHybraryPage(event){
        this.nav.push(HybraryPage);
    }

    moveToDeveloperPage(event){
        this.nav.push(DeveloperPage);
    }

    openMenu(event){
        this.menuCtrl.toggle();
    }

    moveToBaeknam(event){
        var nav = this.nav;

        // makes loading
        let loading = this.loadingCtrl.create({
            content: "Loading...",
            dismissOnPageChange: true
        });
        // makes alert
        let alert = this.alertCtrl.create({
            title: "문제가 발생하였습니다.",
            subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
            buttons: ["OK"]
        });
        loading.present();

        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getBaeknamEmptyReadingRoom",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MainPage.prototype.baeknamInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(BaeknamPage, {
                baeknamInfo: MainPage.prototype.baeknamInfo
            });
        });
    }

    moveToLaw(event){
        var nav = this.nav;

        // makes loading
        let loading = this.loadingCtrl.create({
            content: "Loading...",
            dismissOnPageChange: true
        });

        // makes alert
        let alert = this.alertCtrl.create({
            title: "문제가 발생하였습니다.",
            subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
            buttons: ["OK"]
        });
        loading.present();

        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getLawEmptyReadingRoom",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MainPage.prototype.lawInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(LawPage, {
                lawInfo: MainPage.prototype.lawInfo
            });
        });
    }

    moveLockerPage(event){
        // move to locker page.
        var nav = this.nav;

        // makes loading
        let loading = this.loadingCtrl.create({
            content: "Loading...",
            dismissOnPageChange: true
        });

        // makes alert
        let alert = this.alertCtrl.create({
            title: "문제가 발생하였습니다.",
            subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
            buttons: ["OK"]
        });
        loading.present();

        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getSeoulEmptyLockers",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MainPage.prototype.lockersInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(LockerPage, {
                lockersInfo: MainPage.prototype.lockersInfo
            });
        });
    }

    moveReadingRoomPage(event){
        // move to reading room page.
        this.nav.push(ReadingRoomPage);
    }

}