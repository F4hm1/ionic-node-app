import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { OrdersPage } from '../orders/orders';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = OrdersPage;
  tab3Root: any = NotificationsPage;
  tab4Root: any = ProfilePage;

  constructor(public navCtrl: NavController) {}

}
