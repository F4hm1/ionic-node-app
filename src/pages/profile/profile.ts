import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { Api } from "../../providers/api";
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public store: StorageService, public db: Database, public alertCtrl: AlertController, public api: Api) { }
  
  ionViewWillEnter() {
    this.username = this.auth.afAuth.auth.currentUser.displayName || ''
    this.email = this.auth.afAuth.auth.currentUser.email || ''
    this.emailVerified = this.auth.afAuth.auth.currentUser.emailVerified
    this.phone = this.auth.afAuth.auth.currentUser.phoneNumber || ''
  }
  sendVerificationMail() {
    this.auth.afAuth.auth.currentUser.sendEmailVerification().then(_=> {
      this.presentAlert("Sent! Check mail box")
    }).catch(_=> {
      this.presentAlert("An error occured")
    })
  }
  updateProfile() {
    this.store.getUser().then(user=> {
      let phone = user.phone
      let address = user.address
      console.log(user)
      this.navCtrl.push(UpdateProfile, {
        username: this.auth.afAuth.auth.currentUser.displayName,
        phone: phone,
        address: address,
      })
    })
  }
  deleteAccount(password) {
    this.auth.afAuth.auth.signInWithEmailAndPassword(this.email, password).then(user=> {
      this.api.deleteUser();
      this.auth.deleteAccount();
      this.presentAlert("Account Deleted")
      this.onLogout();
    }, err => {
      this.presentAlert(err.message)
    }).catch((err)=> {
      this.presentAlert(err.message)
    })
  }
  onLogout() {
    this.db.logout();
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
        type: 'password',
        placeholder: 'Input your password to continue'
      }],
      buttons: [{
        text: "cancel",
        role: "cancel"
      }, {
        text: 'Delete',
        handler: (data)=> {
          this.deleteAccount(data.password)
        }
      }]
    })
    myAlert.present()
  }

}
