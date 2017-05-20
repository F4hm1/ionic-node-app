import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SignUp } from './sign-up';

@NgModule({
  declarations: [
    SignUp,
  ],
  imports: [
    IonicModule.forRoot(SignUp),
  ],
  exports: [
    SignUp
  ]
})
export class SignUpModule {}
