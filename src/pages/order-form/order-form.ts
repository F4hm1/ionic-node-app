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
    delivery: false,
    date : new Date()
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public store: StorageService, 
    public alertCtrl:AlertController, 
    public db: Database) {
  }
  cancel() {
    this.viewCtrl.dismiss()
  }
  onSubmit() {
    if (this.order.customer.length < 3) this.presentAlert(`Customer name is invalid`)
    else if (this.order.phone.toString().length < 9 || this.order.phone.toString().length > 11 ) this.presentAlert('Please input a valid Phone Number')
    else if (this.order.package < 1) this.presentAlert('Please input package Type')
    else {
      console.log(this.order)
      this.store.addOrder(this.order).then(() => {
        this.presentAlert();
        this.viewCtrl.dismiss()
      }).then((val)=>{
        this.db.syncOrders()
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

}
