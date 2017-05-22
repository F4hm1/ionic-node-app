import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { SignUp } from '../pages/sign-up/sign-up';
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { NotificationsPage } from "../pages/notifications/notifications";
import { OrdersPage } from "../pages/orders/orders";

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService } from "../providers/storage";
import { Database } from "../providers/database";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages = [
    { title: "Home", component: HomePage, icon: "home" },
    { title: "Orders", component: OrdersPage, icon: "cart" },
    { title: "Notifications", component: NotificationsPage, icon: "notifications" }
  ]

  openPage(p) {
    this.nav.setRoot(p.component)
  }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public store: StorageService, public db: Database, public network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }).then(()=> {
      console.log("Checking connection ", this.network.type)
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.store.networkConnected = false
        console.log('network was disconnected :-(');
      });
      let connectSubscription = this.network.onConnect().subscribe( _=> {
        this.store.networkConnected = true
        setTimeout(() => {
          this.db.syncOrders()
            console.log('we got a wifi connection, woohoo!');
        }, 2000);
      });
    })
    // connectSubscription.unsubscribe();

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.db.setUp(user.uid)
        this.rootPage = TabsPage;
        this.db.syncOrders()
        this.store.setUser(user.uid)
        authObserver.unsubscribe();
      } else {
        this.rootPage = SignUp;
        authObserver.unsubscribe();
      }
    });
  }
}
