import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OrderForm } from "../order-form/order-form";
import { StorageService } from "../../providers/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  createOrder() {
    let modalOver = this.modalCtrl.create(OrderForm)
    modalOver.present()
  }
  clearStore() {
    this.store.clearStore()
  }
  constructor(public modalCtrl: ModalController, 
    public store: StorageService) {}
}
