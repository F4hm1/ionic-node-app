import { Component } from '@angular/core';
import { StorageService } from "../../providers/storage";
import { Api } from "../../providers/api";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  public notifications = []
  
  constructor(public store: StorageService, public api: Api) {}
  doRefresh(refresh) {
    this.api.getOrders()
    refresh.complete()
    this.ionViewWillEnter()
  }
  ionViewWillEnter() {
    console.log("About to enter notifications page")
    this.api.getNotifications()
    this.store.getNotifications().subscribe(val => {
      this.notifications = val
      console.log("Stored notifications ", val)
      console.log("This.notifications ", this.notifications)
    })
  }
}
