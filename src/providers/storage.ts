import { Injectable } from '@angular/core';
import { Http, Headers , RequestOptions } from '@angular/http';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the Service provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export interface Order {
  customer : string,
  phone: number,
  package: number,
  delivery: boolean
}
@Injectable()
export class StorageService {
  orders = []
  user = ''
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Service Provider');
    this.getOrders()
  }
  addOrder(order: Order) {
    console.log("Storing locally")
    return this.storage.get('orders').then(val=> {
      var orders
      if (val  === null) {
        orders = []
      } else {
        orders = JSON.parse(val)
      }
      console.log(orders)
      orders.push(order) 
      this.orders = orders;
      return orders;
    }).then((orders)=> {
      this.storage.set('orders', JSON.stringify(orders))
      this.getOrders()
    })
  }
  
  loadOrders(orders) {
    console.log("reloading your orders")
    this.storage.set('orders', JSON.stringify(orders))
  }
  loadNotifications(notifications){
    this.storage.set('notifications', JSON.stringify(notifications))
  }
  storeNewNotification(notification) {
    this.storage.get('notifications').then(val=> {
      let oldNotifications = JSON.parse(val)
      oldNotifications.concat(notification)
    })
  }
  syncOrders() {
    // this.storage.get('orders').then(orders => {
    // console.log("Syncing orders ", orders)
    // return this.http.post("http://localhost:4012/api/sync-orders", {orders}, this.options)
    // })
  }

  getOrders() {
    let orders = this.storage.get('orders').then(val=> {
      if (val !== null) {
        return JSON.parse(val)
      } else {
        return []
      }
    })
    return Observable.fromPromise(orders)
  }

  clearStore() {
    this.storage.remove("orders").then(()=> {
      console.log("storage is now empty")
    }).then((res)=> {
      this.storage.get('orders').then((val)=> {
        console.log(`Orders still has ${val}`)
      })
    })
  }
  setUser(uid) {
    this.storage.set('uid', uid).then(_ => {
      console.log('User id set as ', uid)
    })
    this.user = uid
  }
  getUser() {
    this.storage.get("uid").then(val=>{
      this.user = val
      console.log(val, this.user)
    })
    return this.user
  }

}
