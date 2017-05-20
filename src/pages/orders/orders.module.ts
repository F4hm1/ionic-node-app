import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OrdersPage } from './orders';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicModule.forRoot(OrdersPage),
  ],
  exports: [
    OrdersPage
  ]
})
export class OrdersModule {}
