import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(public http: Http, public afAuth: AngularFireAuth) {
    console.log('Hello Auth Provider');
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }
  signupWithGmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }
  signinWithPhone() {
    // this.afAuth.auth.siginWithPhoneNo
    // let app = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //   'size': 'invisible',
    //   'callback': function(response) {
    //     reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignInSubmit();
    //   }
    // })
    // https://firebase.google.com/docs/auth/web/phone-auth
  }
  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }
  updateName(displayName) {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName,
      photoURL : '' 
    })
  }
  updatePhone(no) {
    return this.afAuth.auth.currentUser.updatePhoneNumber(no)
  }
  updatePasword(oldPassword, newPassword) {
    return this.afAuth.auth.currentUser.updatePassword(newPassword)
  }
  verified() {
    //user might not probably create orders until verified
    return this.afAuth.auth.currentUser.emailVerified
  }
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
  }

}
