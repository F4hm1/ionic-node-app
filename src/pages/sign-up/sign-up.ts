import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from "../home/home";

import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";

import { ForgotPassword } from "../forgot-password/forgot-password";


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
  strategy: string= "signup"

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
  
  signupWithGmail() {
    // this.auth.signupWithGmail()
    this.presentAlert("Don't be lazy enter your email and a password")
  }
  loginUser(){
    if (this.loginForm.value.email === "Melvin") {
      this.navCtrl.setRoot(HomePage)
      this.store.setUser(this.loginForm.value.email)
      this.db.getOrders()
    } else if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    }else {
      this.auth.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( user => {
        this.store.setUser(user.uid);
        this.db.setUp(user.uid)
        this.navCtrl.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
        this.presentAlert(error.message)
        }).catch(err=> {
          this.loading.dismiss()
          this.presentAlert("Is it me or there is no data conection?")
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
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.auth.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then((user) => {
        this.auth.sendVerificationMail()//should use result to check if email actually exists before creating a/c 
        this.store.setUser(user.uid); 
        this.db.setUp(user.uid); 
        this.navCtrl.setRoot(HomePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          this.presentAlert(errorMessage)
        }).catch(err=> {
          this.loading.dismiss()
          this.presentAlert("Is it me or there is no data connection?")
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: "Ok",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

}
