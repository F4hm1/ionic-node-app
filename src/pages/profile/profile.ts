import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";
import { SignUp } from "../sign-up/sign-up";

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username : string
  email : string
  phone : string
  isVerified: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public store: StorageService, public db: Database) {
    this.auth.afAuth.authState.subscribe(val=> {
      console.log("probably logged in ", val), 
      (err)=> {
        console.log("Not logged in ", err)
      }
    })
  }
  
  ionViewWillEnter() {
    this.username = this.auth.afAuth.auth.currentUser.displayName || ''
    this.email = this.auth.afAuth.auth.currentUser.email || ''
    this.isVerified = this.auth.afAuth.auth.currentUser.emailVerified
    this.phone = this.auth.afAuth.auth.currentUser.phoneNumber || ''
  }
  sendVerificationMail() {
    // this.auth.afAuth.auth.currentUser.sendEmailVerification()
  }
  updateProfile() {
    //Pop-up one UI like that
  }
  logout() {
    this.db.logout()
    this.auth.logoutUser().then(()=>{
      this.navCtrl.setRoot(SignUp)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
