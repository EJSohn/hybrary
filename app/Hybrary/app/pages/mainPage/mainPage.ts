import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController} from 'ionic-angular';
import {Component} from "@angular/core";
import { SMS } from 'ionic-native';

// import components
import {LockerPage} from '../lockerPage/lockerPage';
import {ReadingRoomPage} from '../readingRoomPage/readingRoomPage';

@Component({
    templateUrl: 'build/pages/mainPage/mainPage.html'
})

export class MainPage {
    static get parameters(){
        return [[NavController], [NavParams], [LoadingController], [AlertController]]
    }

    // local variables.
    nav: any;
    lockersInfo: any;
    loadingCtrl: any;
    alertCtrl: any;

    constructor(nav, navParams, loadingCtrl, alertCtrl){
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
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
        nav.present(loading);

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
                nav.preset(alert);
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