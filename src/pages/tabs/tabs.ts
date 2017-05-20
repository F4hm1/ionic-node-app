import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { OrdersPage } from '../orders/orders';
import { HomePage } from '../home/home';


/**
 * Generated class for the Tab tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = OrdersPage;
  tab3Root: any = NotificationsPage;

  constructor(public navCtrl: NavController) {}

}
