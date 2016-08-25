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
    lockers: any;

    constructor(nav, navParams){
        this.nav = nav;

        // get lockers Info
        this.lockers = navParams.get("lockersInfo");
    }

    alertOn(event){
        $("#alertButton").removeAttr("dark");
        $("#alertButton").addClass("redClass");

        $("#alertText").text("");
    }

    dataUpdate(event){
        // update data 

        var nav = this.nav;
        var loading = Loading.create({
            content: "Loading...",
            dismissOnPageChange: true
        });
        this.nav.present(loading);

        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getSeoulEmptyLockers",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                LockerPage.prototype.lockers = data;
                loading.dismiss();
            },
            error: function(){
                // warning
                loading.dismiss();

                let alert = Alert.create({
                    title: "문제가 발생하였습니다.",
                    subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
                    buttons: ["OK"]
                });
                nav.preset(alert);
            }
        }).then(()=>{
            this.lockers = LockerPage.prototype.lockers;
            loading.dismiss();
        });
    }
}