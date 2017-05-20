import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage";

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  items: FirebaseListObservable<any[]>;
  objects: FirebaseObjectObservable<any[]>;
  url = `/db/users/${this.store.getUser()}/orders`

  constructor(public http: Http, public db: AngularFireDatabase, public store: StorageService) {
    this.items = db.list(this.url);

    console.info(`connecting to ${this.url}`)
    this.items.subscribe(val => {
      console.log('Items, ', val)
    }, (err)=>{
      console.log("An error occured while getting online orders")
    })  
  }
  createOrder(order) {
    this.items.push(order)
  }
  syncOrders() {
    // this.items = this.store.getOrders()
  }
  getOrders() {
    return this.items.subscribe(val => {
      this.store.loadOrders(val)
      console.log("Loaded, ", val)
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
    this.getOrders()
  }
}
