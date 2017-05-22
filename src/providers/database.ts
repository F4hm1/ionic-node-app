import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage";

@Injectable()
export class Database {
  items: FirebaseListObservable<any[]>;
  objects: FirebaseObjectObservable<any[]>;
  public url
  constructor(public http: Http, public db: AngularFireDatabase, public store: StorageService) {
     
  }
  setUp(uid) {
    this.db.database.goOnline()
    this.url = `/db/users/${uid}/orders`
    this.items = this.db.list(this.url);
    console.info(`connecting to ${this.url}`)
    // this.myEvent = this.items.subscribe(snapshot => {
    //   console.log('Items, ', snapshot)
    // }, (err)=> {
    //   console.log("An error occured while getting online orders")
    // })
  }
  logout() {
    this.db.database.goOffline()
    console.log('Logged out from db, url ', this.url)
  }

  syncOrders() {
    this.store.getOrders().subscribe(val=> {
      console.log("Stored orders for db", val)
      this.db.database.ref(this.url).set(val ,err=> console.log(err))
    })
    // this.items = this.store.getOrders()
  }
  getOrders() {
    if (this.items) {
      return this.items.map(val => {
        this.store.loadOrders(val)
        console.log("Loaded, ", val)
        return val
      }, (err)=> {
        console.log(`An error occured during Sync`)
      }).subscribe()
    }
  }

  storeNotification(info) {

  }

  syncNotifications() {

  }
  
  reloadUser(user?) {
    this.syncNotifications()
    this.getOrders()
  }
}
