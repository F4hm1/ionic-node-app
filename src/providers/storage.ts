import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";


export interface Order {
  customer : string,
  phone: number,
  package: number,
  delivery: boolean,
  date: Date
}
@Injectable()
export class StorageService {
  orders = []
  notifications = []
  user = ''
  networkConnected: boolean = true

  constructor(public storage: Storage) {
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
      console.log("Before ", orders)
      orders.push(order) 
      this.orders = orders;
      console.log("Now ", orders)
      return orders;
    }).then((orders)=> {
      this.storage.set('orders', JSON.stringify(orders))
      this.getOrders()
    })
  }
  
  loadOrders(orders) {
    console.log("New orders are", orders )
    return this.storage.set('orders', JSON.stringify(orders))
  }
  loadNotifications(notifications) {
    console.log("New notification are", notifications )
    return this.storage.set('notifications', JSON.stringify(notifications))
  }
  // storeNewNotification(notification) {
  //   this.storage.get('notifications').then(val=> {
  //     let oldNotifications = JSON.parse(val)
  //     oldNotifications.concat(notification)
  //   })
  // }
  getNotifications() {
    let notifications = this.storage.get("notifications").then(val=> {
      if (val !== null) {
        return JSON.parse(val)
      } else {
        return []
      }      
    })
    return Observable.fromPromise(notifications)
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
    return this.storage.remove("orders").then(()=> {
      console.log("storage is now empty")
    })
  }
  setUser(uid) {
    this.storage.set('uid', uid).then(_ => {
      console.log('User id set as ', uid)
    })
    this.user = uid
  }
  getUser() {
    this.storage.get("uid").then(val=> {
      this.user = val
      console.log("Getting user ",val," as ", this.user)
    })
    return this.user
  }
}
