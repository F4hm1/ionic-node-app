import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { OrderForm } from "../order-form/order-form";
import { StorageService } from "../../providers/storage";
import { Database } from "../../providers/database";
import { Auth } from "../../providers/auth"
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseObjectObservable<any>
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
    public afdb: AngularFireDatabase,
    public db: Database) {
      this.db.getOrders()
      this.items = this.afdb.object('/db');
  }
  check() {
    console.log(this.items)
  }
}
