import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { OrdersPage } from '../orders/orders';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { SignUp } from '../sign-up/sign-up';
import { StorageService } from "../../providers/storage";



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {
  myTabs:any
  tab1Root: any = HomePage;
  tab2Root: any = OrdersPage;
  tab3Root: any = NotificationsPage;
  tab4Root: any = ProfilePage;

  constructor(public navCtrl: NavController, public store: StorageService) {
  }

  onLogout(logout) {
    console.log("Recieved emitted event", logout)
    this.navCtrl.setRoot(SignUp)
  }
  fuckOut(){
    console.log("fucking out")
    this.navCtrl.setRoot(SignUp)
  }
}
