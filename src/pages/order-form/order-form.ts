import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { StorageService, Order } from "../../providers/storage";
import { Database } from '../../providers/database';


@IonicPage()
@Component({
  selector: 'page-order-form',
  templateUrl: 'order-form.html',
})
export class OrderForm {
  public order: Order = {
    customer: 'Dele',
    phone: 0,
    package: 5,
    delivery: false
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public service: StorageService, 
    public alertCtrl:AlertController, 
    public db: Database) {
  }
  cancel() {
    this.viewCtrl.dismiss()
  }
  onSubmit() {
    if (this.order.customer.length < 3) this.presentAlert(`Customer name is invalid`)
    else if (this.order.phone < 1 || !(this.order.phone < Infinity) ) this.presentAlert('Please input a valid Phone Number')
    else if (this.order.package < 1) this.presentAlert('Please input package Type')
    else {
      this.db.createOrder(this.order)
      this.service.addOrder(this.order).then(() => {
        this.presentAlert();
        this.viewCtrl.dismiss()
      })
    }
  } 
  presentAlert(a?) {
    let alert = this.alertCtrl.create({
        title: a ? "Ouch!" : "Submitted !",
        message: a || "Your request have been recieved",
        buttons: [{text: "Ok"}]
      })
      alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderForm');
  }

}
