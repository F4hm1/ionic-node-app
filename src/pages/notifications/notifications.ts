import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { StorageService } from "../../providers/storage";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  public notifications = []
  
  constructor(public store: StorageService) {}
  
  ionViewWillEnter() {
    console.log("About to enter notifications page")
    this.store.getNotifications().subscribe(val => {
      this.notifications = val
      console.log("Stored notifications ", val)
      console.log("This.notifications ", this.notifications)
    })
  }
  }
