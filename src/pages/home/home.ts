import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { OrderForm } from "../order-form/order-form";
import { SignUp } from "../sign-up/sign-up";
import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";
import { Auth } from "../../providers/auth"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fillOrderForm() {
    let modalOver = this.modalCtrl.create(OrderForm)
    modalOver.present()
  }
  clearStore() {
    this.store.clearStore()
  }
  ntwrkLog() {
    // window.Connection;
  }
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public modalCtrl: ModalController, 
    public store: StorageService, 
    public auth: Auth,
    public db: Database) {
      this.db.getOrders()
  }

}
