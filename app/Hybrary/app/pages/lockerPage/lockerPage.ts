import {NavController, NavParams, Storage, LocalStorage, SqlStorage, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {Component} from "@angular/core";

@Component({
    templateUrl: 'build/pages/lockerPage/lockerPage.html'
})

export class LockerPage {
    static get parameters(){
        return [[NavController], [NavParams], [LoadingController], [AlertController], [ToastController]]
    }

    // local variables
    nav: any;
    lockers: any;
    loadingCtrl: any;
    alertCtrl: any;
    toastCtrl: any;
    storage: any;
    phone: any;

    constructor(nav, navParams, loadingCtrl, alertCtrl, toastCtrl){
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;

        this.storage = new Storage(SqlStorage);

        // get lockers Info
        this.lockers = navParams.get("lockersInfo");
    }

    ngAfterViewInit(){
        this.storage.get("phone").then((phone)=>{
            if(phone!=undefined){
                this.phone = phone;
            } else {
                this.phone = "";
            }
        });
    }

    alertOn(event){

        var toastCtrl = this.toastCtrl;
        // make phone number input alert
        let alert = this.alertCtrl.create({
            title: "알림 예약하기",
            message: "메세지 알림을 위해 다시(-)를 제외한 핸드폰 번호를 입력해주세요",
            inputs: [
                {
                    name: "phone",
                    placeholder: "phone number",
                    value: this.phone
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
                        // make loading
                        var loading = this.loadingCtrl.create({
                            content: "Loading...",
                            dismissOnPageChange: true
                        });
                        loading.present();

                        var regExp =  /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;;
                        if(regExp.test(data.phone)){
                            // 올바른 번호 형식
                            $.ajax({
                                url: "http://hyuis.kr:60//v1.0/mobile/"+data.phone,
                                async: true,
                                dataType: "json",
                                success: function(data){
                                    loading.dismiss();

                                    let toast = toastCtrl.create({
                                        message: "알림 예약에 성공했습니다.",
                                        duration: 2000,
                                        position: "middle"
                                    });
                                    toast.present();
                                },
                                error: function(data){
                                    loading.dismiss();

                                    let toast = toastCtrl.create({
                                        message: "알림 실패했습니다. 네트워크를 다시 확인해주세요.",
                                        duration: 2000,
                                        position: "middle"
                                    });
                                    toast.present();
                                }
                            }).then(()=>{
                                console.log("성공한 형식");
                                console.log(typeof(data.phone));
                                this.storage.set("phone", data.phone);
                            });
                        } else {
                            loading.dismiss();

                            // 잘못된 형식
                            let toast = this.toastCtrl.create({
                                message: '예약 실패 : 잘못된 번호 형식입니다.',
                                duration: 2000,
                                position: "middle"
                            });
                            toast.present();
                        }
                    }
                }
            ]
        });
        alert.present();
        // .then(()=>{
        //     if(this.phone!=undefined){
        //         $(".alert-input").val(this.phone);
        //         $(".alert-input").attr("ng-reflect-model",this.phone);
        //     }
        // });
        
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