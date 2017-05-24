import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { Database } from "../../providers/database";

/**
 * Generated class for the UpdateProfile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfile {
  public data =  {
    displayName : '',
    email: '',
    phoneNo: ''
  }
  public loading: any
  public password:string = ''

  changeUsername() {
    console.log("Updating username to ", this.data.displayName)
    this.auth.updateName(this.data.displayName).then(()=> {
      console.log("display name is now ", this.auth.afAuth.auth.currentUser.displayName)
      this.presentAlert(`Username Updated to ${this.auth.afAuth.auth.currentUser.displayName}`)
    })
    this.auth.afAuth.auth.currentUser.phoneNumber = this.data.phoneNo
  }
  showUsername() {
    console.log("username: ", this.data.displayName," password: ", this.password)
  }
  update() {
    let email = this.auth.afAuth.auth.currentUser.email
    let password = this.password
    this.db.savePhone(this.data.phoneNo)
    this.auth.loginUser(email, password).then((user)=> {
      // this.auth.updateEmail(this.data.email)
      this.auth.updateName(this.data.displayName).then(_ => {
        this.presentAlert("Details updated")
        this.loading.dismiss()
      })
    }, (err)=> {
      let msg = err.message
      this.loading.dismiss()
      console.log(err)
      this.presentAlert(msg)
    }).catch(err=> {
      let msg = err.message
      this.loading.dismiss()
      this.presentAlert(msg)
    }).then(_=> {
      console.log("New name is ",this.auth.afAuth.auth.currentUser.displayName)
      console.log("Other stuff ",_)
    })
    this.loading = this.loadCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  presentAlert(msg) {
    let myAlert = this.alertCtrl.create({
      message: msg|| 'An error occured',
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    })
    myAlert.present()
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth, public alertCtrl: AlertController, public loadCtrl: LoadingController, public db: Database) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfile ', this.data );
  }

}
