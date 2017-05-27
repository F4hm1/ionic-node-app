import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";
import { StorageService } from "./storage";

@Injectable()
export class Api {

  constructor(public http: Http, public storage: Storage, public store: StorageService) {
    console.log('Hello Api Provider');
  }
  
/* ------------------ ORDERS --------------*/

  createOrder(order) {
    console.log("api", order)
    return this.storage.get("userID").then(id => {
      order.user = id
      console.log("ID is jusy",id)
      this.http.post(`http://localhost:4012/api/orders/create`, order).subscribe(res => {
        console.log("Ive ", res.json())
        this.store.addOrder(res.json().result)
      })
    })
  }
  getOrders() {
    return this.storage.get("userID").then(id => {
      console.log(id)
      this.http.get(`http://localhost:4012/api/orders/get/${id}`).subscribe(res => {
        console.log("Orders: ", res.json())
        this.store.loadOrders(res.json().result)
        return res.json()
      })
    })
  }

  updateOrders(order) {
    return this.http.post(`http://localhost:4012/api/orders/update`, order).subscribe(res => {
      console.log(res.json())
      return res.json()
    })
  }

  deleteOrder(order) {
    let id = order[0]._id
    return this.http.get(`http://localhost:4012/api/orders/delete/${id}`)
  }



/* ------------------ NOTIFICATIONS --------------*/

  getNotifications() {
    return this.storage.get("userID").then(id => {
      console.log('notice id ', id)
      this.http.get(`http://localhost:4012/api/notifications/${id}`).subscribe(res => {
        console.log("Notices ",res.json())
        this.store.loadNotifications(res.json().result)
        return res.json()
      })
    })
  }


  /*---------- USERS ------------------------*/

  createUser(user) {
    return this.http.post(`http://localhost:4012/api/users/create`, user).map(res=> {
      console.log(res.json())
      this.storeUser(res.json().result)
    }).subscribe()
  }

  updateUser(user) {
    return this.storage.get("userID").then(id => {
      user._id = id
      this.http.post(`http://localhost:4012/api/users/update`, user).subscribe(res => {
        console.log(res.json())
        this.storeUser(res.json().result)
        return res.json();
      })
    })
  }

  getUser(email) {
    return this.http.post(`http://localhost:4012/api/users/get/`, {email: email}).subscribe(res => {
      console.log("Welcome ", res.json()) 
      this.storeUser(res.json().result)
      this.onResume()
      return res.json();
    })
  }

  storeUser(user) {
    this.store.setUser(user)
  }

  deleteUser() {
    return this.storage.get("userID").then(id => {
      this.http.get(`http://localhost:4012/api/users/delete/${id}`).subscribe(res => {
        return res.json();
      })
    })
  }

  onResume() {
    this.getNotifications()
    this.getOrders()
  }
}
