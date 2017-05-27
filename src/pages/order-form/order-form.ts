import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { StorageService } from "../../providers/storage";
import { Database } from '../../providers/database';
import { Api } from '../../providers/api';


@IonicPage()
@Component({
  selector: 'page-order-form',
  templateUrl: 'order-form.html',
})
export class OrderForm {
  public order = {
    customer: 'Dele',
    phone: 0,
    email: '',
    package: 5,
    address: '',
    delivery: false,
    date : new Date()
  }
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public store: StorageService, 
    public api: Api, 
    public alertCtrl:AlertController, 
    public db: Database) {
  }
  cancel() {
    this.viewCtrl.dismiss()
  }
  onSubmit() {
    if (this.order.customer.length < 3) this.presentAlert(`Customer name is invalid`)
    else if (this.order.phone.toString().length < 9 || this.order.phone.toString().length > 11 || !Number(this.order.phone)) {
      this.presentAlert('Please input a valid Phone Number')
    }
    else if (this.order.package < 1) this.presentAlert('Please input package Type')
    else {
      console.log(this.order)
      this.api.createOrder(this.order).then(res=> {
        this.presentAlert();  //change 4 one fine UI
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

}
