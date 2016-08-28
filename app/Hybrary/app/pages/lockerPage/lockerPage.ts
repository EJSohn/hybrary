import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/lockerPage/lockerPage.html'
})

export class LockerPage {
    static get parameters(){
        return [[NavController], [NavParams], [LoadingController], [AlertController]]
    }

    // local variables
    nav: any;
    lockers: any;
    loadingCtrl: any;
    alertCtrl: any;

    constructor(nav, navParams, loadingCtrl, alertCtrl){
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;

        // get lockers Info
        this.lockers = navParams.get("lockersInfo");
    }

    alertOn(event){
        // make phone number input alert
        let alert = this.alertCtrl.create({
            title: "알림 예약하기",
            message: "메세지 알림을 위해 핸드폰 번호를 입력해주세요",
            inputs: [
                {
                    phone: "핸드폰 번호",
                    placeholder: "phone number"
                },
            ],
            buttons: [
                {
                    text: "취소",
                    role: "cancel",
                },
                {
                    text: "예약",
                    handler: data => {
                        console.log(data.phone);
                    }
                }
            ]
        });
        alert.present();
        console.log("테스트한다");
    }

    dataUpdate(event){
        // update data 

        var nav = this.nav;
        var loading = this.loadingCtrl.create({
            content: "Loading...",
            dismissOnPageChange: true
        });
        loading.present();

        $.ajax({
            url: "http://hyuis.kr:60/v1.0/getSeoulEmptyLockers",
            async: true,
            dataType: "json",
            success: function(data){
                // data receive success
                LockerPage.prototype.lockers = data;
            },
            error: function(){
                // warning
                loading.dismiss();

                let alert = this.alertCtrl.create({
                    title: "문제가 발생하였습니다.",
                    subTitle: "네트워크를 확인하고 다시 한 번 시도해주세요.",
                    buttons: ["OK"]
                });
                alert.present();
            }
        }).then(()=>{
            this.lockers = LockerPage.prototype.lockers;
            loading.dismiss();
        });
    }
}