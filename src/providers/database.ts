import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { StorageService } from "./storage";

@Injectable()
export class Database {
  items: FirebaseListObservable<any[]>;
  objects: FirebaseObjectObservable<any[]>;
  public url
  private myEvent: Subscription
  constructor(public http: Http, public db: AngularFireDatabase, public store: StorageService) {
     
  }
  setUp(uid) {
    this.url = `/db/users/${this.store.getUser()}/orders`
    this.items = this.db.list(this.url);
    console.info(`connecting to ${this.url}`)
    this.myEvent = this.items.subscribe(val => {
      console.log('Items, ', val)
    }, (err)=>{
      console.log("An error occured while getting online orders")
    })
  }
  logout() {
    this.myEvent.unsubscribe()
  }
  createOrder(order) {
    this.items.push(order)
  }
  syncOrders() {
    // this.items = this.store.getOrders()
  }
  getOrders() {
    return this.items.map(val => {
      this.store.loadOrders(val)
      console.log("Loaded, ", val)
      return val
    }, (err)=> {
      console.log(`An error occured during Sync`)
    })
  }
  storeNotification(info) {

  }
  syncNotifications() {

  }
  reloadUser(user?) {
    this.syncNotifications()
    this.getOrders().subscribe()
  }
}
