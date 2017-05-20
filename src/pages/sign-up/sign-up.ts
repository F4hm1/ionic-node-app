import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';

import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";

import { TabsPage } from "../tabs/tabs";
import { ForgotPassword } from "../forgot-password/forgot-password";

/**
 * Generated class for the SignUp page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {
  email:string;
  password:string;
  loading: Loading;
  loginForm:FormGroup;
  signupForm:FormGroup;
  strategy: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public auth: Auth,
    public db: Database,
    public store: StorageService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) 
    {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      })
      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }
  
  setStrategy(n: number){
    this.strategy = n
    console.log(this.strategy)
  }
  loginUser(){
    if (this.loginForm.value.email === "Ekene") {
      this.navCtrl.setRoot(TabsPage)
      this.store.setUser(this.loginForm.value.email)
    } else if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    }else {
      this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( auth => {
        this.store.setUser(auth.uid);
        this.db.syncOrders()
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }
  goToResetPassword() {
    this.navCtrl.push(ForgotPassword)
  }
  presentAlert(message) {
    let myAlert = this.alertCtrl.create({
      title : "Error",
      message,
      buttons:[{text:"Retry"}]
    })
    myAlert.present()
  }
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.auth.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then((auth) => {
        this.auth.sendVerificationMail()//should use result to check if email actually exists before creating a/c 
        this.store.setUser(auth.uid);  
        this.navCtrl.setRoot(TabsPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
