import {NavController, NavParams, Storage, LocalStorage, SqlStorage, Alert ,Loading} from 'ionic-angular';
import {Component} from "@angular/core";
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
    templateUrl: 'build/pages/iframePage/iframe.html'
})

export class IframePage {
    static get parameters(){
        return [[NavController], [NavParams], [DomSanitizationService]]
    }

    // local variables
    nav: any;
    Src: SafeResourceUrl;
    RRname: any;

    constructor(nav, navParams, sanitizer){
        this.nav = nav;
        this.Src = sanitizer.bypassSecurityTrustResourceUrl(navParams.get('showSrc'));
        this.RRname = navParams.get('RRname');

        console.log(this.Src);
    }
}