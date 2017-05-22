import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";
import { HomePage } from "../home/home";
import { OrderForm } from "../order-form/order-form";

@Component({
  template: `

  <ion-content>
    <h3 text-center>{{ order.customer }}</h3>
    <h4 text-center>
    STATUS &nbsp; 
      <ion-chip item-end color="danger">
        <ion-icon name="information-circle"></ion-icon>
        <ion-label>PENDING</ion-label>
      </ion-chip>
    </h4>
    <ion-list>
      <ion-item>No of items left: {{ order.package }}</ion-item>
      <ion-item>Phone No: {{ order.phone }}</ion-item>
      <ion-item>Delivery: {{ order.delivery ? "Yes" : "No" }}</ion-item>
      <ion-item>Date: {{ order.date | date}}</ion-item>
    </ion-list>
  </ion-content>
  `
})
export class MyPopOver {
  order: {}
  constructor(public params: NavParams){
    this.order = this.params.data.order
    console.log(this.order)
  }
}

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  public orders = []

  doRefresh(refresh) {
    this.db.getOrders()
    refresh.complete()
    this.ionViewWillEnter()
  }
  
  createNew() {
    this.navCtrl.setRoot(HomePage)
    let modal = this.modalCtrl.create(OrderForm)
    modal.present()
  }

  deleteOrder(i) {
    this.orders.splice(i ,1)
    this.store.loadOrders(this.orders).then(val => {
      this.db.syncOrders()
    })
  }
  
  viewOrder(order, event) {
    let popOver = this.popOver.create(MyPopOver, {order})
    popOver.present()
  }
  ionViewWillEnter() {
    console.log("About to enter page")
    this.store.getOrders().subscribe(val => {
      this.orders = val
      console.log("Stored Orders ", val)
      console.log("This.orders ", this.orders)
    })
  }
  constructor(public navCtrl: NavController, public store: StorageService, public modalCtrl: ModalController, public db: Database, public popOver: PopoverController) {
    
  }

}