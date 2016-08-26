import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert, Loading} from 'ionic-angular';
import {Component} from "@angular/core";

// import components
import {BaeknamPage} from "../readingRoomBaeknam/readingRoomBaeknam";
import {LawPage} from "../readingRoomLaw/readingRoomLaw";

@Component({
    templateUrl: 'build/pages/readingRoomPage/readingRoomPage.html'
})

export class ReadingRoomPage {
    static get parameters(){
        return [[NavController], [NavParams]]
    }
    // local variables
    nav: any;
    baeknamInfo: any;
    lawInfo: any;

    constructor(nav, navParams){
        this.nav = nav;
    }

    moveToBaeknam(event){
        var nav = this.nav;

        // makes loading
        let loading = Loading.create({
            content: "Loading...",
            dismissOnPageChange: true
        });
        nav.present(loading);

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

                let alert = Alert.create({
                    title: "문제가 발생하였습니다.",
                    subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
                    buttons: ["OK"]
                });
                nav.present(alert);
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
        let loading = Loading.create({
            content: "Loading...",
            dismissOnPageChange: true
        });
        nav.present(loading);

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

                let alert = Alert.create({
                    title: "문제가 발생하였습니다.",
                    subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
                    buttons: ["OK"]
                });
                nav.present(alert);
            }
        }).then(()=>{
            // go
            this.nav.push(LawPage, {
                lawInfo: ReadingRoomPage.prototype.lawInfo
            });
        });
    }
}