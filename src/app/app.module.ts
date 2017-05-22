import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from "@angular/http";
import { CloudModule, CloudSettings } from '@ionic/cloud-angular'

import { MyApp } from './app.component';

import { NotificationsPage } from '../pages/notifications/notifications';
import { OrdersPage, MyPopOver } from '../pages/orders/orders';
import { HomePage } from '../pages/home/home';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { OrderForm } from '../pages/order-form/order-form';
import { SignUp } from '../pages/sign-up/sign-up';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { StorageService } from "../providers/storage";
import { Auth } from "../providers/auth";
import { Database } from "../providers/database";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4b5ed3d6'
  }
}
export const firebaseConfig = {
  apiKey: "AIzaSyAgH26qvDkfhVvCg4LdSPmMu2Env8kvn5o",
  authDomain: "laundry-app-3508e.firebaseapp.com",
  databaseURL: "https://laundry-app-3508e.firebaseio.com",
  projectId: "laundry-app-3508e",
  storageBucket: "laundry-app-3508e.appspot.com",
  messagingSenderId: "235860740454"
};

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    OrdersPage,
    HomePage,
    TabsPage,
    ProfilePage,
    ForgotPassword,
    OrderForm,
    MyPopOver,
    SignUp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    OrdersPage,
    HomePage,
    TabsPage,
    ProfilePage,
    ForgotPassword,
    OrderForm,
    MyPopOver,
    SignUp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    Auth,
    Network,
    Database,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
