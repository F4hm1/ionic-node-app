import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from "@ionic-native/document-viewer";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  public notifications = []
  viewDoc() {
    let options: DocumentViewerOptions = {
      title: "My pdf",
      documentView:	{ closeLabel: 'string' },	
      navigationView:	{ closeLabel: 'string' },	
      email:	{ enabled: false },	
      print:	{ enabled: true },	
      openWith:	{ enabled: true },	
      bookmarks:	{ enabled: false },	
      search:	{ enabled: true },
      autoClose:	{ onPause: false }	
    }
    this.doc.viewDocument('assets/Eloquent_Javascript.pdf', 'application/pdf', [options])
  }
  constructor(public navCtrl: NavController, public doc: DocumentViewer) {}
  
  }
