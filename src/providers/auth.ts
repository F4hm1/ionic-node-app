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
  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
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
    //  User should reinput old pasword 1st--- currentUser.reauthenticate check: https://firebase.google.com/docs/auth/web/manage-users
    // return this.afAuth.auth.currentUser.updatePassword(password)
  }
  updateEmail(oldPassword, newEmail) {
    //  User should reinput old pasword 1st using--- currentUser.reauthenticate
    // return this.afAuth.auth.currentUser.updateEmail(newEmail)
  }
  verified() {
    //user might not probably create order until verified
    return this.afAuth.auth.currentUser.emailVerified
  }
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(()=> true, ()=> false)
  }

}
