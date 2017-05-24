import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage";
import { Auth } from "./auth";

@Injectable()
export class Database {
  orders: FirebaseListObservable<any[]>;
  notifications: FirebaseListObservable<any[]>;
  profile: FirebaseListObservable<any[]>;
  user : FirebaseListObservable<any[]>;
  public url
  constructor(public http: Http, public db: AngularFireDatabase, public store: StorageService, public auth: Auth) {
     
  }
  setUp(uid) {
    this.db.database.goOnline()
    this.url = `/db/users/${uid}`
    this.user = this.db.list(`${this.url}`);
    this.orders = this.db.list(`${this.url}/orders`);
    this.notifications = this.db.list(`${this.url}/notifications`);
    this.profile = this.db.list(`${this.url}/profile`);
    console.info(`connecting to ${this.url}`)
    this.db.database.ref(`${this.url}/profile`).update({
      username: this.auth.afAuth.auth.currentUser.displayName,
      email: this.auth.afAuth.auth.currentUser.email
    }).catch(err => {
      console.log("tried to update user profile ", this.profile)
    })

    // this.myEvent = this.orders.subscribe(snapshot => {
    //   console.log('orders, ', snapshot)
    // }, (err)=> {
    //   console.log("An error occured while getting online orders")
    // })
  }
  savePhone(phone) {
    this.db.database.ref(`${this.url}/profile/phone`).set(phone).then(console.log)
    // this.profile.push({
    //   phone: phone
    // }).catch(err => {
    //   console.log("tried to update phone no ", this.profile)
    // }).then(_=> {
    //   this.profile.subscribe(_=> {
    //     console.log("updated phone no ", _ )
    //   })
    // })
  }
  logout() {
    this.db.database.goOffline()
    console.log('Logged out from db, url ', this.url)
  }
  getPhone() {
    this.profile.subscribe(snapshot=> {
      return snapshot[2].val()
    })
  }

  syncOrders() {
    this.store.getOrders().subscribe(val=> {
      console.log("Stored orders for db", val)
      this.db.database.ref(`${this.url}/orders`).set(val ,err=> console.log(err))
    })
    // this.orders = this.store.getOrders()
  }
  getOrders() {
    if (this.orders) {
      return this.orders.map(val => {
        this.store.loadOrders(val)
        console.log("Loaded, ", val)
        return val
      }, (err)=> {
        console.log(`An error occured during Sync`)
      }).subscribe()
    }
  }

  syncNotifications() {
    
  }

  getNotifications() {
    if (this.notifications) {
      return this.notifications.map(val => {
        //this.store.loadOrders(val)
        console.log("Loaded, ", val)
        return val
      }, (err)=> {
        console.log(`An error occured during Sync`)
      }).subscribe()
    }
  }
  
  reloadUser(user?) {
    this.getNotifications()
    this.getOrders()
  }
}
