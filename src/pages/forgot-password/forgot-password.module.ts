import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForgotPassword } from './log-in';

@NgModule({
  declarations: [
    ForgotPassword,
  ],
  imports: [
    IonicModule.forRoot(ForgotPassword),
  ],
  exports: [
    ForgotPassword
  ]
})
export class ForgotPasswordModule {}
