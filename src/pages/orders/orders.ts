import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { StorageService, Order } from "../../providers/storage";
import { Database } from "../../providers/database";
import { HomePage } from "../home/home";
import { OrderForm } from "../order-form/order-form";

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  public orders =[]

  doRefresh(refresh) {
    this.db.getOrders()
    setTimeout( _=> {
      refresh.complete()
    }, 2000)
  }
  createNew() {
    this.navCtrl.setRoot(HomePage)
    let modal = this.modalCtrl.create(OrderForm)
    modal.present()
  }

  deleteOrder(i) {
    this.orders.splice(i ,1)
    this.service.loadOrders(this.orders)
  }

  constructor(public navCtrl: NavController, public service: StorageService, public modalCtrl: ModalController, public db: Database) {
    this.service.getOrders().subscribe(val => {
      this.orders = val
    })
    console.log("Stored Orders", this.service.getOrders())
    console.log("this.orders", this.orders)
  }

}