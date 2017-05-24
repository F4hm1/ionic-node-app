import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { StorageService } from "./storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  user

  constructor(public http: Http, public store: StorageService) {
    console.log('Hello Api Provider');
  }

  createUser(email) {
    console.log('Creating new user ', email)
    return this.http.post("http://localhost:4012/api/new-user", {email}, this.options)
  }
  reloadUser(email) {
    console.log('Reloading user ', email)
    this.http.post("http://localhost:4012/api/get-orders", {email}, this.options).map(res=>{
      return res.json()
    }).subscribe((orders)=> {
      //this.store.loadOrders(orders)
    })
    return this.http.post("http://localhost:4012/api/get-notifications", {email}, this.options).map(res=>{
      return res.json()
    }).subscribe((orders)=> {
      this.store.loadNotifications(orders)
    })
  }
  createOrder(order) {
    order.user = this.store.getUser() ||"Ekene"
    console.log("sending order")
    return this.http.post("http://localhost:4012/api/new-order", {order}, this.options).map(res=> {
      return res.json()
    }).subscribe(console.log)
  }
  
  getNotifications() {
    let email = this.store.getUser()
    console.log("fetching notifications")
    return this.http.post("http://localhost:4012/api/notify", {email}, this.options)        
  }

}
