import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";
import { SignUp } from "../sign-up/sign-up";
import { UpdateProfile } from "../update-profile/update-profile";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username : string
  email : string
  phone : string
  emailVerified: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public store: StorageService, public db: Database, public alertCtrl: AlertController) {
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
    this.emailVerified = this.auth.afAuth.auth.currentUser.emailVerified
    this.phone = this.auth.afAuth.auth.currentUser.phoneNumber || ''
  }
  sendVerificationMail() {
    this.auth.afAuth.auth.currentUser.sendEmailVerification().then(_=> {
      console.log("mail sent"), err => {
        console.log("did not send ",err)
      }
    }).then(_=> {
      this.presentAlert("Sent! Check mail box")
    })
  }
  updateProfile() {
    this.navCtrl.push(UpdateProfile, this.auth.afAuth.auth.currentUser)
  }
  deleteAccount() {
    //this.presentAlert("Are you sure you want to stop making money?")
    console.log("That's how your a/c will be deleted")
  }
  onLogout() {
    this.db.logout()
    this.auth.logoutUser().then(()=>{
      this.navCtrl.setRoot(SignUp)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }
  presentAlert(msg) {
    let myAlert = this.alertCtrl.create({
      message: msg,
      buttons: [{
        text: "OK"
      }]
    })
    myAlert.present()
  }
  deleteAccountAlert() {
    let myAlert = this.alertCtrl.create({
      message: "Are you sure you want to stop making money?",
      inputs:[{
        name: 'password',
        placeholder: 'Input your password to continue'
      }],
      buttons: [{
        text: "cancel",
        role: "cancel"
      }, {
        text: 'Delete',
        handler: ()=> {
          this.deleteAccount()
        }
      }]
    })
    myAlert.present()
  }

}
