/// <reference path="../typings/jquery.d.ts" />

import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController, MenuController} from 'ionic-angular';
import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, App} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MainPage} from './pages/mainPage/mainPage';

// import components
import {LockerPage} from './pages/lockerPage/lockerPage';
import {ReadingRoomPage} from './pages/readingRoomPage/readingRoomPage';
import {LawPage} from './pages/readingRoomLaw/readingRoomLaw';
import {BaeknamPage} from "./pages/readingRoomBaeknam/readingRoomBaeknam";
import {HybraryPage} from "./pages/hybraryPage/hybraryPage";
import {DeveloperPage} from "./pages/developerPage/developerPage";


@Component({
  templateUrl: "build/app.html",
})

export class MyApp {
  @ViewChild(Nav) nav;
  private rootPage:any;
  private lockersInfo:any;
  private baeknamInfo: any;
  private lawInfo: any;

  constructor(private platform:Platform, 
              private menu:MenuController,     
              private loadingCtrl:LoadingController,
              private alertCtrl: AlertController,
              private app: App) {
    this.rootPage = MainPage;


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

    moveToHybraryPage(event){
        this.menu.close();
        this.nav.push(HybraryPage);
    }

    moveToDeveloperPage(event){
        this.menu.close();
        this.nav.push(DeveloperPage);
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

        this.menu.close();
        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getBaeknamEmptyReadingRoom",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MyApp.prototype.baeknamInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(BaeknamPage, {
                baeknamInfo: MyApp.prototype.baeknamInfo
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

        this.menu.close();

        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getLawEmptyReadingRoom",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MyApp.prototype.lawInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(LawPage, {
                lawInfo: MyApp.prototype.lawInfo
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

        this.menu.close();
        
        // server call and retrieve locker's info
        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getSeoulEmptyLockers",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                MyApp.prototype.lockersInfo = data;
            },
            error: function(){
                // warning
                loading.dismiss();
                alert.present();
            }
        }).then(()=>{
            // go
            nav.push(LockerPage, {
                lockersInfo: MyApp.prototype.lockersInfo
            });
        });
    }

}

ionicBootstrap(MyApp)
