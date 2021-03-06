import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignUp } from '../pages/sign-up/sign-up';
import { HomePage } from "../pages/home/home";
import { ProfilePage } from "../pages/profile/profile";
import { NotificationsPage } from "../pages/notifications/notifications";
import { OrdersPage } from "../pages/orders/orders";

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService } from "../providers/storage";
import { Api } from "../providers/api";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  pages = [
    { title: "Home", component: HomePage, icon: "home" },
    { title: "Orders", component: OrdersPage, icon: "cart" },
    { title: "Notifications", component: NotificationsPage, icon: "notifications" },
    { title: "Profile", component: ProfilePage, icon: "contact" }
  ]

  openPage(p) {
    this.nav.setRoot(p.component)
  }
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth, public store: StorageService, public api: Api) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    })

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage
        this.store.setUID(user.uid)
        this.api.onResume()
        authObserver.unsubscribe();
      } else {
        this.rootPage = SignUp;
        authObserver.unsubscribe();
      }
    });
  }
}
