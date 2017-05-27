import { Component } from '@angular/core';
import { IonicPage, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from "../../providers/auth";
import { Api } from "../../providers/api";


@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfile {
  public data =  {
    username : '',
    phone: '',
    address: ''
  }
  public loading: any
  public password:string = ''

  constructor(public navParams: NavParams, public auth: Auth, public alertCtrl: AlertController, public loadCtrl: LoadingController, public api: Api) {}

  update() {
    this.createLoading()
    let email = this.auth.afAuth.auth.currentUser.email
    let password = this.password
    var login = this.auth.loginUser(email, password).then(user => user,
      (err) => {
        this.handleError(err)
    }).then(()=> {
      this.auth.updateName(this.data.username),
      (err) => {
        this.handleError(err)
      }
    }).catch(err => {
      this.handleError(err.message)
    }).then(()=>{
      this.api.updateUser(this.data)
    }).then(_=> {
      this.presentAlert("Details updated")
      this.loading.dismiss()
    }).catch(err=> {
      this.handleError(err.message)
    })
  }
  handleError(msg) {
    this.loading.dismiss()
    this.presentAlert(msg)
  }
  createLoading() {
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


  ionViewDidLoad() {
    this.data.username = this.navParams.data.username
    this.data.phone = this.navParams.data.phone
    this.data.address = this.navParams.data.address
  }

}
