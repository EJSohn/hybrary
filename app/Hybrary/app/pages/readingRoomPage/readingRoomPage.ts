import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController} from 'ionic-angular';
import {Component} from "@angular/core";

// import components
import {BaeknamPage} from "../readingRoomBaeknam/readingRoomBaeknam";
import {LawPage} from "../readingRoomLaw/readingRoomLaw";

@Component({
    templateUrl: 'build/pages/readingRoomPage/readingRoomPage.html'
})

export class ReadingRoomPage {
    static get parameters(){
        return [[NavController], [NavParams], [LoadingController], [AlertController]]
    }
    // local variables
    nav: any;
    baeknamInfo: any;
    lawInfo: any;
    loadingCtrl: any;
    alertCtrl: any;

    constructor(nav, navParams, loadingCtrl, alertCtrl){
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
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
                ReadingRoomPage.prototype.baeknamInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            this.nav.push(BaeknamPage, {
                baeknamInfo: ReadingRoomPage.prototype.baeknamInfo
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
                ReadingRoomPage.prototype.lawInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            this.nav.push(LawPage, {
                lawInfo: ReadingRoomPage.prototype.lawInfo
            });
        });
    }
}