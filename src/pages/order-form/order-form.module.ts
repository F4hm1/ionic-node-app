import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OrderForm } from './order-form';

@NgModule({
  declarations: [
    OrderForm,
  ],
  imports: [
    IonicModule.forRoot(OrderForm),
  ],
  exports: [
    OrderForm
  ]
})
export class OrderFormModule {}
